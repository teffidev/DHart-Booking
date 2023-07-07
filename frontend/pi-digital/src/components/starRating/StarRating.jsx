import axios from "axios"
import { useEffect, useState } from "react"
import { HiStar } from "react-icons/hi2"

const StarRating = ({productId, userId, onSetScore}) => {

    const [ score, setScore ] = useState(0)

    const styleYellow = { color: "orange" }
    const styleBlack = { color: "black" }

    const createScore = async(star) => {
        const newScore = {
            score: star,
            productId,
            userId
        }
        await axios.post(`${import.meta.env.VITE_API_URL}/scores`, newScore)
        setScore(star)
        onSetScore();
    }

    const getScore = async() => {
        if(userId){
            const response = await axios(`${import.meta.env.VITE_API_URL}/scores/product/${productId}/user/${userId}`)
            const { data } = await response
            setScore(data)
            onSetScore();
        }
    }
    
    useEffect(() => {
        getScore(productId, userId)   
    }, [productId, userId])

    return(
        <>
            {
                [1,2,3,4,5].map((star) => {
                    if(score >= star){
                        return <HiStar 
                            key={star} 
                            id={`${star}`} 
                            onClick={() =>createScore(star)} 
                            style= { styleYellow }
                        />
                    } else {
                        return <HiStar 
                            key={star} 
                            id={`${star}`} 
                            onClick={() =>createScore(star)} 
                            style= { styleBlack }
                        />
                    }
                   
                    
                })
            }
        </>
    )
}

export default StarRating;