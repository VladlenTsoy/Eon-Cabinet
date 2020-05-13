import React from 'react';
import styled from "styled-components";
import Stars from "./stars/Stars";
import Trophy from "./trophy/Trophy";
import {Button} from "antd";
import {ArrowLeftOutlined, HistoryOutlined, RedoOutlined, EyeOutlined} from "@ant-design/icons";
import {Card} from "lib";
import CurrentExercise
    from "../../olympiad/left-block/current-exercise/CurrentExercise";

const DivWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  padding: 1rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  
  .wrapper{
    width: 100%;
  }

  .stars-wrapper{
    position: relative;
    transform: scale(1.5);
    animation: BackStars 1s 3.2s ease-in-out forwards;
    margin-bottom: 3rem;
  }
  
  @keyframes BackStars {
    100%{
      transform: scale(1);
    }
  }
  
  .counter-wrapper{
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
  
  //.counter{
  //  font-size: 40px;
  //  font-weight: 900;
  //  border-radius: 500rem;
  //  color: #ffffff;
  //  background: #ff4755;
  //  animation-name: fadeInDown;
  //  animation-delay: 4s;
  //  animation-duration: 2s;
  //  animation-fill-mode: both;
  //  padding: 0.25rem 2rem;
  //  box-shadow: 0 3px 10px #ff475563;
  //  
  //  .slash{
  //    opacity: 0.5;
  //  }
  //}

  
  //.title{
  //  text-align: center;
  //  font-size: 100px;
  //  font-weight: 600;
  //  line-height: 1;
  //  animation-name: fadeInUp;
  //  animation-delay: 4s;
  //  animation-duration: 2s;
  //  animation-fill-mode: both;
  //  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  //  
  //  background: #fff;
  //  border-radius: 500rem;
  //  padding: 0.5rem 3rem;
  //}
`;

const Wrapper = () => {
    return <DivWrapper>
        <div>
            <CurrentExercise stats={{all: 0, success: 0}}/>
            <Card>
                <p>Результат сохранен, вы можете продолжить выполнение олимпиады позже.</p>
                <Button
                    type="dashed"
                    icon={<ArrowLeftOutlined/>}
                    size="large"
                    block
                >
                    Вернуться к списку
                </Button>
            </Card>
        </div>
        <div className="wrapper">
            <div className="counter-wrapper">
                <div className="counter">
                    50 <span className="slash">/</span> 50
                </div>
            </div>
            <div className="stars-wrapper">
                <Stars/>
            </div>
            <div className="title">
                Победа!
            </div>
        </div>
        <div>
            <Card>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis deserunt doloremque, ex laborum
                    quas recusandae sint voluptatibus? Accusantium ad autem earum, hic maxime officia, porro praesentium
                    quam quia reprehenderit veritatis.</p>
                <Button block icon={<HistoryOutlined/>} size="large">Повторить те же примеры</Button>
            </Card>
            <Card>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur distinctio ex, iste nobis
                    nulla obcaecati provident voluptas. Aut dolor eius, eos expedita inventore iste nam quaerat quasi
                    quidem rerum tempora.</p>
                <Button block icon={<RedoOutlined/>} size="large">Повторить с новыми примерами</Button>
            </Card>
        </div>
    </DivWrapper>;
};

export default Wrapper;