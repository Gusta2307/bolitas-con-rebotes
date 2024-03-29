import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom'
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import GJSON from './Gallery_JSON';
import {random} from '../utils'

export default function Intro(){
    const navigate = useNavigate()

    const Container = styled.div`
        height: calc(100vh - 50px);
        color: #FFFFFF;

        // center items
        display: flex;
        justify-content: center;   
        flex-direction: column; 
        align-items: center;
    `

    const Wrapper = styled.div`
        padding: 20px;

        width: fit-content;
        height: fit-content;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        z-index: 100;
        
        // glass effect
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px  0 rgba(0,0,0,0.37);
        border: 2px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px;

        @media (max-width: 768px) {
            padding: 10px;
        }
    `

    const Title = styled.h1`
        font-size: 3rem;
        font-weight: bold;
        aling-items: center;

        @media (max-width: 768px) {
            font-size: 1.5rem;
        }
    `

    const Subtitle = styled.h2`
        font-size: 2rem;
        font-weight: bold;
        margin-top: 10px;
        aling-items: center;

        @media (max-width: 768px) {
            font-size: 1rem;
        }
    `

    const Description = styled.p`
        font-size: 1.2rem;
        margin-top: 10px;
        aling-items: center;

        @media (max-width: 768px) {
            font-size: 0.8rem;
        }
    `

    const Button = styled.button`
        background-color: #1F6CAB;
        color: #FFFFFF;
        font-size: 1rem;
        font-weight: bold;
        padding: 10px;
        border: none;
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;

        transition: background-color 0.5s ease-in-out;
        transition: color 0.5s ease-in-out;

        &:hover {
            background-color: #00E6F6;
            color: #082a3a;
        }

        @media (max-width: 768px) {
            font-size: 1rem;
            padding: 5px;
        }
    `

    return (
        <Container>
            <Wrapper>
                <Title>Bienvenido a BCR</Title>
                <Subtitle>Subtitle</Subtitle>
                <Description>Description</Description>
                <Button onClick={() => {
                    const gjson = GJSON()
                    const el = gjson[new Date() % gjson.length]
                    console.log(el)
                    navigate('/bolitas-con-rebotes/canvas', {state: {is_loop:el.loop, sol_active: 0, throws:el.throws, times:el.times, balls:el.balls, solutions:el.solutions, name:el.name}})
                }}>Play Demo</Button>
            </Wrapper>
            <Outlet />
        </Container>
    )
}