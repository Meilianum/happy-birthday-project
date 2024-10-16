
"use client";
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaBirthdayCake, FaGift } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'

type ConfettiProps = {
  width: number
  height: number
}

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })

const candleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']

const BirthdayCard = () => {
  const [candlesLit, setCandlesLit] = useState<number>(0) 
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0) 
  const [showConfetti, setShowConfetti] = useState<boolean>(false) 
  const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 }) 
  const [celebrating, setCelebrating] = useState<boolean>(false)

  const totalCandles: number = 6
  const totalBalloons: number = 6

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true)
    }
  }, [candlesLit, balloonsPoppedCount])

  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit(prev => prev + 1)
    }
  }

  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount(prev => prev + 1)
    }
  }

  const celebrate = () => {
    setCelebrating(true)
    setShowConfetti(true)
    const interval = setInterval(() => {
      setCandlesLit(prev => {
        if (prev < totalCandles) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
   <div
  className='min-h-screen flex justify-center items-center p-4'
  style={{
    backgroundImage: 'url(https://thumbs.dreamstime.com/b/roses-happy-birthday-card-greeting-small-posy-pink-gypsofilia-fowers-against-softened-white-background-inscribed-83940986.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover', // Ensures the image covers the entire screen
    width: '100vw', // Typo corrected from 'wv' to 'vw'
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
  }}
>
  <img
     src= "https://img.freepik.com/premium-photo/happy-birthday-pastel-watercolor-painting-illustration-greeting-card-girl-baby-cute-beautiful-lovely_885367-1950.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728345600&semt=ais_hybrid" 
  
    alt="Second Image"
    style={{
      position: 'absolute',
      top: '50%',  // Adjust the top position
      left: 'auto', // Adjust the left position
      right: '5%', // Adjust the right position
      width: '300px', // Set width for the image
      height: '300px', // Set height for the image
      objectFit: 'cover', // Ensures the image maintains its aspect ratio
    }}
  />
</div>
       
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="mx-auto overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-2xl hover:scale-105 ease-in-out hover:shadow-xl border-2 bord">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-black bg-pink-300">Happy 03th Birthday!</CardTitle>
            <CardDescription className="text-2xl font-semibold text-black">Batool Fatima</CardDescription>
            <p className="text-lg text-gray-500">Oct 26,</p>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Light the candles:</h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                      >
                        <FaBirthdayCake
                          className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                          style={{ color: candleColors[index % candleColors.length] }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      // Unlit candle
                      <FaBirthdayCake
                        className={`w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Pop the balloons:</h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GiBalloons
                      className={`w-8 h-8 cursor-pointer hover:scale-110`}
                      style={{ color: index < balloonsPoppedCount ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              className="bg-black text-white hover:bg-gray-400 transition-all duration-300"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
          {/* <h1 className='text-center'> presentsd by: @Rukhsana Rais</h1> */}
        
        </Card>
      </motion.div>
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
       )}
      <div className=' font-size-2xl font-bold pt-1'><h1>I am batool fatima this my birthday card</h1> </div> 
   
   
    </div>
  )
}

export default BirthdayCard
