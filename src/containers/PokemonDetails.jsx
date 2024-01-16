import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const PokemonDetails = () => {
  const [detail, setDetail] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(({ data }) => setDetail(data));
  }, [id, navigate]);

  const navigator = (i) => {
    if (i === "left" && Number(id) !== 1) {
      navigate(`/pokemons/${id - 1}`);
    } else if (i === "right") {
      navigate(`/pokemons/${Number(id) + 1}`);
    }
  };
  return (
    <Wrapper currentPage={id}>
      <a href="/pokemons" className="back">
        back
      </a>
      <Modal key={Math.random()}>
        <img
          className="modal__avatar"
          src={detail.sprites?.front_default}
          alt="modal-avatar"
        />
        <p className="modal__detail__name">{detail.name}</p>
        <div className="modal__stats">
          {detail.stats?.map(({ base_stat, stat }) => (
            <div className="stats__stat">
              <span>{stat.name}</span>
              <Bar progress={base_stat}>
                <div className="progress"></div>
              </Bar>
            </div>
          ))}
        </div>
        <span
          onClick={() => {
            navigator("left");
          }}
          className="modal__navigator left"
        >
          {"<"}
        </span>
        <span
          onClick={() => {
            navigator("right");
          }}
          className="modal__navigator right"
        >
          {">"}
        </span>
      </Modal>
    </Wrapper>
  );
};

export default PokemonDetails;
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #9a00ff;
  padding: 40px 70px;
  .back {
    position: absolute;
    color: white;
    font-size: 3.2vw;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    &:active {
      color: gray;
    }
  }
`;
const Modal = styled.div`
  width: 300px;
  height: 400px;
  padding: 20px;
  border-radius: 33px;
  background: #ede7ee;
  box-shadow: inset 6px 6px 11px #e6dbe9, inset -6px -6px 11px #a29e9e;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: fadeIn 0.3s 1;
  @keyframes fadeIn {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
  .modal__navigator {
    position: absolute;
    font-size: 4.8vw;
    font-weight: 900;
    top: 50%;
    transform: translateY(-50%);
    user-select: none;
    color: white;
    cursor: pointer;
    &.left {
      left: -50%;
    }
    &.right {
      right: -50%;
    }
    &:active {
      color: #9c9c9c;
    }
  }
  img {
    display: block;
    margin: auto;
    height: 50%;
    width: 150px;
    animation: jump 2s infinite alternate;
  }
  @keyframes jump {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-20px);
    }
  }
  .modal__detail__name {
    font-weight: 600;
  }
  .modal__stats {
    .stats__stat {
      display: flex;
      justify-content: space-between;
      text-align: start;
      align-items: center;
      gap: 4px;
      span {
        width: 52%;
        border-right: 1px solid gray;
      }
    }
  }
`;

const Bar = styled.div`
  width: 80%;
  height: 8px;
  background-color: #a1d7fc;
  border-radius: 8px;
  display: flex;
  align-items: center;

  .progress {
    width: ${({ progress }) => progress + "%"};
    border-radius: 8px;
    margin-left: 1px;
    height: 6px;
    background-color: #0f89db;
    animation: grow 1s ease-in-out 1;
    @keyframes grow {
      from {
        width: 0%;
      }
    }
  }
`;
