import Image from "next/image";

function StarRating({ratings}){

    const stars=new Array(ratings).fill(0)
    return(

        <>
         {stars.map((star, index) => (
        <Image key={index} src={`/assets/star.svg`} width={20} height={20} />
      ))}

        </>
    )
}

export default  StarRating;