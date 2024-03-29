import styled from "styled-components"
import NavBar from "./NavBar"
import Gallery_JSON from "./Gallery_JSON"
import { useNavigate } from "react-router-dom"
import Particles from './Particles'

const P = Array.from({ length: 60 }, (v, k) => k).map((v, k) => {
    return (
        <Particles
            key={k}
            _key={k}
            x={Math.random() * (k % 2 === 0 ? -11 : 11)}
            y={Math.random() * 12}
        />)
})


export default function Gallery(props) {
    const navigate = useNavigate();

    const Container = styled.div`
        height: 100vh;
        background-color: #082A3A;
    `

    const Wrapper = styled.div`
        height: calc(100vh - 50px);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    `

    const Box = styled.div`
        padding: 20px 20px;
        width: fit-content;
        height: fit-content;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        z-index: 1000;

        // glass effect
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px  0 rgba(0,0,0,0.37);
        border: 2px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px;

        // margin-right: 1vw;

        @media (max-width: 768px) {
            padding: 10px;
            border-radius: 10px;
        }
    `

    const BoxSeq = styled.div`
        padding: 20px 20px;
        width: fit-content;
        height: fit-content;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        z-index: 1000;

        // glass effect
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px  0 rgba(0,0,0,0.37);
        border: 2px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px;

        margin-right: 1vw;
        margin-bottom: 1vw;

        @media (max-width: 768px) {
            padding: 10px;
            border-radius: 10px;
        }
    `

    const BoxItems = styled.div`
        max-width: 85vw;
        max-height: 60vh;
        display: flex;
        flex-wrap: wrap;

        // overflow
        overflow: auto;

        &::-webkit-scrollbar {
            width: .3rem;
        }

        &::-webkit-scrollbar-thumb {
            background: #6fcf97;
            border-radius: 20px;
        }
    `

    const TitleBox = styled.div`
        display: absolute;
        justify-content: center;
        
        &:after {
            width: 100%;
            content: "";
            display: block !important;
            border-bottom: 2px solid #CCC;
            margin-bottom: 2vh;
            // padding-top: .5rem;
        }
    `

    const Title = styled.h1`
        font-size: 50px;
        font-weight: bold;
        aling-items: center;
        color: #FFFFFF;
        margin: 2vh;

        @media (max-width: 768px) {
            margin-top: 0;
            font-size: 1.5rem;
        }
    `

    const SubTitle = styled.h2`
        font-size: 30px;
        font-weight: bold;
        aling-items: center;
        color: #FFFFFF;
        margin-right: 0vw !important;
        margin-bottom: 0px;
        margin-top: 0px;
        // margin: 2vh;

        &:after {
            width: 100%;
            content: "";
            display: block !important;
            border-bottom: 3px solid #CCC;
            border-radius: 10px;
            // margin-bottom: 1vh;
            padding-top: .5rem;
        }

        @media (max-width: 768px) {
            margin-top: 0;
            font-size: 1rem;
        }
    `

    const Text = styled.h3`
        font-size: 20px;
        font-weight: bold;
        aling-items: center;
        color: #FFFFFF;
        margin-bottom: 0px;

        @media (max-width: 768px) {
            font-size: 0.7rem;
        }
    `

    const DemoButton = styled.button`
        font-weight: bold;
        color: #FFF;
        background-color: #1F6CAB;
        cursor: pointer;
        padding: 10px;
        border: none;
        border-radius: 10px;
        margin-top: 2vh;

        @media (max-width: 768px) {
            font-size: 0.7rem;
            padding: 5px;
            border-radius: 5px;
        }
    `

    function PlayButton(props) {
        const PlayButton = styled.button`
            font-weight: bold;
            color: #FFF;
            background-color: #af1232;
            cursor: pointer;
            padding: 10px;
            border: none;
            border-radius: 10px;
            margin-left: .5vw;
            
            // if props.path is '' then disable button
            &:disabled {
                color: #000;
                background-color: #CCC;
                cursor: not-allowed;
            }

            @media (max-width: 768px) {
                font-size: 0.7rem;
                padding: 5px;
                border-radius: 5px;
            }
        `

        const PlayAudio = () => {
            // Play audio
            // var music =  require(String('./Sound/'+props.path))
            // console.log(music)
            const audio = new Audio(props.path)
            audio.play()
        }

        return (
            <PlayButton disabled={props.disabled} onClick={PlayAudio}>
                Play
            </PlayButton>
        )
    }


    return (
        <Container>
            {
                P.map((el) => {
                    return el
                })
            }
            <NavBar />
            <Wrapper>
                <Box>
                    <TitleBox>
                        <Title>Galeria</Title>
                    </TitleBox>
                    <BoxItems>
                        {
                            Gallery_JSON().map((item, index, array) => {
                                var disable = item.pathAudio === "" ? true : false
                                return (
                                    <BoxSeq key={index}>
                                        <SubTitle>{item.name}</SubTitle>
                                        <Text>Pelotas: {item.balls}</Text>
                                        <Text>Secuencia ciclica: {item.loop}</Text>
                                        <Text>Audio: <PlayButton disabled={disable} path={item.pathAudio} ></PlayButton></Text>
                                        <DemoButton onClick={() =>
                                            navigate('/bolitas-con-rebotes/canvas', {
                                                state: {
                                                    is_loop: item.loop,
                                                    balls: item.balls,
                                                    name: item.name,
                                                    sol_active: 0,
                                                    throws: item.throws,
                                                    times: item.times,
                                                    solutions: item.solutions
                                                }
                                            })
                                        }>Play Demo</DemoButton>
                                    </BoxSeq>
                                )
                            })
                        }
                    </BoxItems>
                </Box>
            </Wrapper>
        </Container>
    )
}