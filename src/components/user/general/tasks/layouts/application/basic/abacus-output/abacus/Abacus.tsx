import React from 'react';
import './Abacus.less';
import IconAbacus from 'assets/images/tasks/abacus.svg';

const OutputAbacus = ({numbers, minus, minusPosition, plus}: any) =>

    <div className="abacus-block">
        {plus ? <div className="block-operator-abacus plus" style={{left: minusPosition}}>+</div> : null}
        {minus ? <div className="block-operator-abacus" style={{left: minusPosition}}>-</div> : null}

        {numbers.map((number: any, key: number) =>
            <div className="bloc-abacus-main" key={key}>
                <div className="bloc-line-sp"/>
                <div className="top-line-abacus">
                    <div className={`block-five-wrap ${number.five ? 'on' : null}`}>
                        <img src={IconAbacus} alt="abacus"/>
                    </div>
                </div>
                <div className="bottom-line-abacus">
                    <div className={`block-int-wrap one-int ${number.ost >= 1 ? 'on' : null}`}>
                        <img src={IconAbacus} alt="abacus"/>
                    </div>
                    <div className={`block-int-wrap two-int ${number.ost >= 2 ? 'on' : null}`}>
                        <img src={IconAbacus} alt="abacus"/>
                    </div>
                    <div className={`block-int-wrap three-int ${number.ost >= 3 ? 'on' : null}`}>
                        <img src={IconAbacus} alt="abacus"/>
                    </div>
                    <div className={`block-int-wrap four-int ${number.ost >= 4 ? 'on' : null}`}>
                        <img src={IconAbacus} alt="abacus"/>
                    </div>
                </div>
            </div>
        )}
    </div>;

const Abacus = ({output, setting}: any) => {

    const outputSetting = (_output: any) => {
        let minusPosition;
        let abacus = (Math.abs(_output) + '').split('')
            .map((val: any) => ({
                five: val >= 5,
                ost: val >= 5 ? val - 5 : val
            }));

        if (window.innerWidth <= 768)
            minusPosition = 'calc(50% - ' + (50 + (abacus.length * 20)) + 'px)';
        else
            minusPosition = 'calc(50% - ' + (80 + (abacus.length * 45)) + 'px)';

        return <OutputAbacus
            numbers={abacus}
            minus={Math.sign(_output) === -1}
            minusPosition={minusPosition}
            plus={Math.sign(_output) !== -1 && setting.extra.includes('plus')}/>
    };


    return outputSetting(output);
};

export default Abacus;