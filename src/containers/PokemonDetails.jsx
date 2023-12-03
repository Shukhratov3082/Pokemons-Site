import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const PokemonDetails = () => {
    const [detail, setDetail] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(({ data }) => setDetail(data))
    }, [id, navigate])

    const navigator = (i) => {
        if (i === 'left' && Number(id) != 1) {
            navigate(`/pokemons/${id - 1}`)
        } else if (i === 'right') {
            navigate(`/pokemons/${Number(id) + 1}`)
        }
    }
    console.log(detail);



    return (
        <Wrapper currentPage={id} >
            <a href='/pokemons' className='back'>back</a>

            <Modal key={Math.random()}>
                <img src={detail.sprites?.front_default} alt="" />
                <p>{detail.name}</p>

                <div className="stats">
                    {detail.stats?.map(({ base_stat, stat }) => {
                        return (
                            <div className="stat">
                                <span>{stat.name}</span>
                                <Bar progress={base_stat}>
                                    <div className="progress"></div>
                                </Bar>
                            </div>)
                    })}

                </div>

                <span onClick={() => { navigator('left') }} className='navigator left'>-</span>
                <span onClick={() => { navigator('right') }} className='navigator right'>+</span>
            </Modal>

        </Wrapper>
    );
}

export default PokemonDetails;
const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: blue;
    padding: 40px 70px;
    .back{
        position: absolute;
        color: white;
        font-size: 40px;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        &:active{
            color: gray;
        }
    }
`
const Modal = styled.div`
    width: 300px;
    height: 400px;
    border-radius: 10px;
    padding: 20px;
    background-color: white;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    animation:fadeIn .3s 1;
    @keyframes fadeIn {
        from{opacity:.3;}
        to{opacity:1;}
        
    }
    .navigator{
        position: absolute;
        font-size: 60px;
        font-weight: 900;
        top: 50%;
        transform: translateY(-50%);
        user-select: none;
        color: white;
        cursor: pointer;
        &.left{
            color: ${({ currentPage }) => currentPage === '1' ? 'gray' : 'white'};
            left: -50%;
        }
        &.right{
            right: -50%;
        }
        &:active{
            color: #9c9c9c;
        }
    }
    img{
        display: block;
        margin: auto;
        width: 150px;
        animation: jump 2s infinite alternate;
    }
    @keyframes jump {
        from{transform:translateY(0)}
        to{transform:translateY(-20px)}
        
    }
    .stats{
        
        .stat{
            display: flex;
            justify-content: space-between;
            text-align: start;
            align-items: center;
            gap: 10px;
            span{
                width: 52%;
                border-right: 1px solid gray;
            }
            
            
        }
    }
`
const Bar = styled.div`
    
    width: 80%;
    height: 8px;
    background-color: #0f89db6f;
    border-radius: 8px;
    display: flex;
    align-items: center;

    .progress{
        width: ${({ progress }) => progress + '%'};
        border-radius: 8px;
        margin-left: 1px;
        height: 6px;
        background-color: #0f89db;
        animation: grow 1s ease-in-out 1;
        @keyframes grow {
            from{width:0%;}
        }
    }
            
`