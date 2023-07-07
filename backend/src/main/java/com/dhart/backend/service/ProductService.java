package com.dhart.backend.service;

import com.dhart.backend.exceptions.NotFoundException;
import com.dhart.backend.exceptions.RegisteredResourceException;
import com.dhart.backend.model.Category;
import com.dhart.backend.model.Feature;
import com.dhart.backend.model.Product;
import com.dhart.backend.model.dto.CategoryDTO;
import com.dhart.backend.model.dto.FeatureDTO;
import com.dhart.backend.model.dto.ProductDTO;
import com.dhart.backend.repository.CategoryRepository;
import com.dhart.backend.repository.ProductRepository;
import com.dhart.backend.utils.CategoryMapper;
import com.dhart.backend.utils.FeatureMapper;
import com.dhart.backend.utils.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;



    @Autowired
    S3Service s3Service;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;

    }

    public List<ProductDTO> findAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (Product product: products) {
            ProductDTO productDTO = ProductMapper.productToProductDto(product);
            productDTOList.add(productDTO);
        }
        return productDTOList;
    }


    public List<ProductDTO> findAllRandomProducts(){
        List<Product> products = productRepository.findAllRandom();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (Product product: products) {
            productDTOS.add(ProductMapper.productToProductDto(product));
        }
        return productDTOS;
    }

    public List<ProductDTO>findAllProductsByCategory(Long idCategory) throws NotFoundException {
        if (categoryRepository.findById(idCategory).isEmpty()) throw new NotFoundException("This category doesn't exist");
        List<Product> products = productRepository.FindAllByCategory(idCategory);
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (Product product: products) {
            productDTOS.add(ProductMapper.productToProductDto(product));
        }
        return productDTOS;
    }

    public void saveProduct(ProductDTO productDTO) throws RegisteredResourceException, NotFoundException {
        if(categoryRepository.findById(productDTO.getIdCategory()).isEmpty()) throw new NotFoundException("This category doesn't exist");
            Product product = ProductMapper.productDtoToProduct(null, productDTO);
            product.setUrlList(productDTO.getUrlList());

        List<Feature> features = new ArrayList<>();
        for (FeatureDTO featureDTO : productDTO.getFeatures()) {
            Feature feature = FeatureMapper.featureDtoToFeature(featureDTO.getId(), featureDTO);
            features.add(feature);
        }
        product.setFeatures(features);




        if(existsProductByTitle(product.getTitle())) throw new RegisteredResourceException("This product already created");
            else{
                productRepository.save(product);
            }
    }


    public boolean existsProductByTitle(String title) {
        return productRepository.findByTitle(title).isPresent();
    }

    public Optional<ProductDTO> findProductById(Long id) throws NotFoundException {
        Optional<ProductDTO> productDTOOptional = null;
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()){
            ProductDTO productDTO = ProductMapper.productToProductDto(product.get());
            productDTOOptional= Optional.of(productDTO);
        }
        else{
            throw new NotFoundException("This product doesn't exists");
        }
        return productDTOOptional;
    }

    public List<ProductDTO> findProductByTitleOrAuthor(String text) {
        List<Product> products = productRepository.findByTitleOrAuthor(text);
        System.out.println("products.size() = " + products.size());
        List<ProductDTO> productDTOS = new ArrayList<>();

        for (Product product: products) {
            productDTOS.add(ProductMapper.productToProductDto(product));
        }
        return productDTOS;
    }

    public void updateProduct(Long id, ProductDTO productDTO) throws NotFoundException {
        findProductById(id);
        Product product = ProductMapper.productDtoToProduct(id, productDTO);
        productRepository.save(product);
    }

    public void deleteProduct(Long id) throws NotFoundException {
        findProductById(id);
        productRepository.deleteById(id);
    }



}

