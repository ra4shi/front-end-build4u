import React from 'react'
 
import { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'
export default function Review() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const location=useLocation()
    const data=location.state
  
    const [rating, setRating] = useState(0);
    const [review,setReview]=useState("")
    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
      };
      const handleInputchange=(e)=>{

setReview(e.target.value)
      }
      const submitReview=async(e)=>{
        e.preventDefault()
       try {
        dispatch(showLoading())
        const response=await axios.post("https://buildforyou.site/api/user/submitReview",{rating,review,data})
        dispatch(hideLoading())
       if(response.data.success){
        toast.success(response.data.message)
        
        navigate("/appointments")
        
       }
       else{
        toast.error(response.data.message)
       }
       } catch (error) {
        dispatch(hideLoading())
        toast.error("try again")
       }
      }
    
  return (
    <div>
      
        <div className="min-h-screen flex items-center bg-gray-900 justify-center">
      <div className="max-w-md w-full p-5 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
        </div>
        
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
       Review
        </h1>
       


        <form>
          <div className="mb-4">
          <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          } transition-colors duration-200 ease-in-out`}
          onClick={() => handleStarClick(star)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M12 2l2.886 8.37L22 9.797l-7.11 5.45 2.885 8.37L12 17.316l-7.11 5.45 2.885-8.37L2 9.797l7.114 1.573L12 2z"
          />
        </svg>
      ))}
      <p className="ml-2 text-sm font-medium text-gray-500">
        {rating === 0 ? 'No rating' : `${rating} out of 5`}
      </p>
    </div>
            <label
              htmlFor="review"
              className="block mb-2 text-sm text-gray-600"
            >
            Write your review here
            </label>
            <textarea
  id="review"
  onChange={handleInputchange}
  name="review"
  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
  rows="5" 
  required
  value={review}
></textarea>

          </div>
         
          <button
          onClick={submitReview}
            type="submit"
            className="w-32 bg-black text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
          >
            Submit
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm">
           
          </p>
        </div>
        <p className="text-xs text-gray-600 text-center mt-8">
          &copy; 2023 WCS LAT
        </p>
      </div>
    </div>

 
    </div>
  )
}
