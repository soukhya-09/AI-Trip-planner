import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { chatSession } from "./Aimodel";
import { prompt } from "./Budget";
import { setData } from '../Redux/dataSlice';

const GenerateRes = () => {
    const formData = useSelector((state) => state.form.formData);
    const navigate = useNavigate();
     const dispatch = useDispatch()
     const handleSubmit = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            toast("Please Login Before Generating Trip");
            navigate("/signin");
            return;
        }
    
        if (!formData.budget || !formData.along || !formData.time || !formData.placeselected) {
            toast("Data incomplete");
            return;
        }
    
        if (isNaN(formData.time) || Number(formData.time) <= 0 || Number(formData.time) > 9) {
            toast("Invalid time duration.");
            return;
        }
    
        try {
            const final_prompt = prompt
                .replace('{location}', formData.placeselected)
                .replace('{alongwith}', formData.along)
                .replace('{amountofmoney}', formData.budget)
                .replace('{numberofdays}', formData.time);
    
            const result = await chatSession.sendMessage(final_prompt);
            const responseText = await result?.response?.text();
            
            console.log("AI Response:", responseText);
    
            // ✅ Parse response to JSON before dispatching
            const tripData = JSON.parse(responseText); // 🚨 Ensure AI response is valid JSON
            
            dispatch(setData(tripData)); // ✅ Store structured data in Redux
            navigate("/result");
    
        } catch (error) {
            console.error("Error generating response:", error);
            toast("An error occurred while generating the trip.");
        }
    };
    

    return (
        <div className=' w-full flex justify-center pb-3 '>
            <button
                onClick={handleSubmit}
                className='text-white bg-black rounded-2xl p-2 hover:bg-slate-400 hover:text-black'
            >
                Generate Trip
            </button>
        </div>
    );
};

export default GenerateRes;
