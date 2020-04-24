import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import ApplicationAnzanWrapper from "../../../../layouts/application/_old/anzan/Anzan.layout";
import {Card} from "lib";
import OutputBlock from "../../../../layouts/output/Output";
import {useOutputTask} from "../../../../../../../../effects/use-output-task.effect";

interface BasicApplicationProps {

}

const BasicApplication: React.FC<BasicApplicationProps> = () => {
    const {game} = useSelector((state: any) => state);

    const {setting, totals} = game;
    const [startApplication] = useOutputTask({times: setting.count});

    useEffect(() => {
        startApplication(totals.map((total: any) => total.exercise));
    }, [totals, startApplication]);

    return <ApplicationAnzanWrapper>
        <Card>
            <OutputBlock/>
        </Card>
    </ApplicationAnzanWrapper>;
};

export default BasicApplication;