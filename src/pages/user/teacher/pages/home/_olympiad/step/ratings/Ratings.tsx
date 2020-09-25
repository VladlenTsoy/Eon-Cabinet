import React from "react"
import {Avatar, Card} from "../../../../../../../../lib/ui"
import styled from "styled-components"

const RatingsStyled = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
`

const RatingStyled = styled.div`
    width: 100%;
`

const ProfileStyled = styled.div`
    text-align: center;
`

const AvatarStyled = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 0.25rem;
`

const FullNameStyled = styled.div`
    margin-bottom: 0.25rem;
`

interface PedestalStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    position: number
}

const PedestalStyled: React.FC<PedestalStyledProps> = styled.div<
    PedestalStyledProps
    >`
    background: ${(props) =>
    props.position === 1
        ? "#ffcb5b"
        : props.position === 2
        ? "#e0e0e0"
        : "#ff9838"};

    color: ${(props) =>
    props.position === 1
        ? "#ff9838"
        : props.position === 2
        ? "#5a5a5a"
        : "#ffcb5b"};

    height: ${(props) =>
    props.position === 1
        ? "125px"
        : props.position === 2
        ? "100px"
        : "75px"};

    font-size: ${(props) =>
    props.position === 1 ? "60px" : props.position === 2 ? "55px" : "50px"};

    border-radius: ${(props) =>
    props.position === 1
        ? "10px 10px 0 0"
        : props.position === 2
        ? "10px 10px 0 10px"
        : "10px 10px 10px 0"};
    padding: 0.5rem 2rem;
    font-weight: 900;
    //color: ${(props) => props.theme.color_black};
    //color: #fff;
    line-height: 1;
    width: 100%;
    text-align: center;
`

const Ratings = () => {
    return (
        <RatingsStyled>
            <RatingStyled>
                <ProfileStyled>
                    <AvatarStyled>
                        <Avatar
                            src="http://192.168.1.37:8000/images/default.svg"
                            width={"50px"}
                        />
                    </AvatarStyled>
                    <FullNameStyled>Цой Владлен</FullNameStyled>
                </ProfileStyled>
                <PedestalStyled position={2}>2</PedestalStyled>
            </RatingStyled>
            <RatingStyled>
                <ProfileStyled>
                    <AvatarStyled>
                        <Avatar
                            src="http://192.168.1.37:8000/images/default.svg"
                            width={"50px"}
                        />
                    </AvatarStyled>
                    <FullNameStyled>Цой Владлен</FullNameStyled>
                </ProfileStyled>
                <PedestalStyled position={1}>1</PedestalStyled>
            </RatingStyled>
            <RatingStyled>
                <ProfileStyled>
                    <AvatarStyled>
                        <Avatar
                            src="http://192.168.1.37:8000/images/default.svg"
                            width={"50px"}
                        />
                    </AvatarStyled>
                    <FullNameStyled>Цой Владлен</FullNameStyled>
                </ProfileStyled>
                <PedestalStyled position={3}>3</PedestalStyled>
            </RatingStyled>
        </RatingsStyled>
    )
}

export default Ratings