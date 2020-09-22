import React from "react"
import styled from "styled-components"
import StarSvg from "../../../../../../assets/images/star.svg"

interface StarStyle {
    position: string
    rotate: string
}
export const StarWrapper: React.FC<StarStyle> = styled.div<StarStyle>`
    position: relative;
    z-index: ${(props) => (props.position === "middle" ? 2 : 1)};
    right: ${(props) => (props.position === "left" ? "-10px" : "auto")};
    left: ${(props) => (props.position === "right" ? "-10px" : "auto")};

    .gray {
        filter: grayscale(1);
        transform: scale(1.1) rotate(${(props) => props.rotate});
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .main {
        opacity: 0;
        transform: scale(1.1) rotate(${(props) => props.rotate});
        width: 100%;
        filter: drop-shadow(0px 5px 3px #ff980050);
    }

    .win {
        opacity: 1;
    }
`

const StarsWrapper = styled.div`
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: 31.5% 37% 31.5%;
    align-items: flex-end;
`

interface StarsProps {
    numberOfStars: number
}

const Stars: React.FC<StarsProps> = ({numberOfStars}) => {
    return (
        <StarsWrapper>
            <StarWrapper position="left" rotate="-10deg">
                <img className="gray" src={StarSvg} alt="star" />
                <img
                    className={`main ${numberOfStars >= 1 && "win"}`}
                    src={StarSvg}
                    alt="star"
                />
            </StarWrapper>
            <StarWrapper position="middle" rotate="0deg">
                <img className="gray" src={StarSvg} alt="star" />
                <img
                    className={`main ${numberOfStars >= 2 && "win"}`}
                    src={StarSvg}
                    alt="star"
                />
            </StarWrapper>
            <StarWrapper position="right" rotate="10deg">
                <img className="gray" src={StarSvg} alt="star" />
                <img
                    className={`main ${numberOfStars >= 3 && "win"}`}
                    src={StarSvg}
                    alt="star"
                />
            </StarWrapper>
        </StarsWrapper>
    )
}

export default React.memo<StarsProps>(Stars)
