import Image from "next/image";
import FoodItem from "./fooditem";
import FoodItemm from "./fooditemm";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from "./loader";
import { testData } from './datacuthook';


const TodayFoodList = ({ eatFoodData }) => {
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/yamm/food/eaten?date=2021-02-08')
        .then((res) =>{
            console.log(res.data,"food")
            setData(arr => [...data, eatFoodData])
        });
    }, []);
    return (
        <div>
            <div className="mt-10 ml-5 mr-5 bg-slate-100 rounded-2xl shadow-2xl">
                
                {eatFoodData.map((item, i)=>{
                    if(i != 0) return < FoodItemm key={i} testData={eatFoodData[i]} /> 
                    // console.log(item,"sds")
                })}
                {/* {  < FoodItemm testData={eatFoodData[1]} /> } */}
                {/* { <FoodItemm testData={testData[1]} /> } */}
                {/* { data.length != 0 && <FoodItemm foodData={data[0][2]} testData={testData[2]} /> } */}
                {/* { data.length != 0 && <FoodItemm foodData={data[0][3]} testData={testData[0]} /> } */}
            </div>
        </div>
    );
};

export default TodayFoodList;