import React,{useState,useEffect} from 'react'
import './Cards.css'

const Schuni = () => {
  return (
    <div>
    <div className='container'>
      
      <div className='card' onClick={() => handleCardClick("School Wear",30000,"https://i.pinimg.com/736x/f8/85/5e/f8855eca2d50a8f58091a5f2443c0e5b.jpg")}>
        <img
          src="https://pbs.twimg.com/media/EkHIbjgXsAAH1Jl.jpg"
          alt="School wear 1"
          
        />
        <div className="card-text">
    <h3>T-shirt</h3>
    <p>₦30000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("School Wear1",45000,"imageUrl")}>
        <img 
          src="https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/473667876_590866740580917_6482193224498647345_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=Bt18WAaL6T4Q7kNvwH0MwlX&_nc_oc=AdnsFN32WHfSKDP9fRn0-aAW04NouyETRTXx99WrnjM4znjVFfraKA5dvdLOc6tKo3Q&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&_nc_gid=DlTw0_0YD0KkQjWKfvfGfw&oh=00_AfqdeetnO-4pz7z0JlnTd4i1ugOdo3aCsVxroxOv-9HoRA&oe=6972EB8C"
          alt="Formal wear 2"
          
        />
        <div className="card-text">
    <h3> Suit</h3>
    <p>₦45000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("School Wear3",50000)}>
        <img
          src="https://cdn-blog.superprof.com/blog_ng/wp-content/uploads/2022/09/school-uniforms-1-1400x935.jpg.webp"
          alt="Formal wear 3"
          
        />
        <div className="card-text">
    <h3> Bandhgala suit</h3>
    <p>₦50000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("School Wear4")}>
        <img
          src="https://www.globalsistersreport.org/files/styles/homepage_features_medium/public/stories/images/StPeterSchool_students%20%282%29%20%28883x1000%29.jpg?h=8e635493&itok=S753EuaF"
          alt="Formal wear 4"
          
        />
      </div>

      <div className='card' onClick={() => handleCardClick("School Wear5")}>
        <img
          src="https://takooka.com/images/robinwhite/robin_white-2.jpg"
          alt="School wear 5"
          
        />
      </div>

      <div className='card' onClick={() => handleCardClick("School Wear6")}>
        <img
          src="https://fchcs.org.ng/wp-content/uploads/2023/10/IMG-20220514-WA0032.jpg"
          alt="School wear 6"
          
        />
            <div className="card-text">
    <h3> Agbada</h3>
    <p>₦50000</p>
  </div>
      </div>
     
</div>

    </div>
  )
}

export default Schuni
