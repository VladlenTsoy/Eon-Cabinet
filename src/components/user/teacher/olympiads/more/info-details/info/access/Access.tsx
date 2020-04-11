import React from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import BlockWrapper from "../layouts/Block.layout";
import styled from "styled-components";

interface AccessStyle {
    type: 'public' | 'invite' | 'private';
}

const AccessWrapper: React.FC<AccessStyle> = styled(BlockWrapper)<AccessStyle>`
  > i {
    color: ${props => props.theme[
        props.type === 'public' ?
            'color_success' : props.type === 'invite' ?
                'color_warning' : 'color_danger'
        ]
    };  
  }
`;

interface AccessProps {
    olympiad: any;
}

const Access: React.FC<AccessProps> = ({olympiad}) => {
    return (
        <AccessWrapper type={olympiad.access}>
            <LegacyIcon type={
                olympiad.access === 'public' ? 'check-circle':
                    olympiad.access === 'invite' ?
                        'user-add' :
                        'info-circle'
            }
            />
            <div>
                <span>
                    {
                        olympiad.access === 'public' ?
                            'Доступ открытый:' :
                            olympiad.access === 'invite' ?
                                'По запросам' :
                                'Доступ закрытый'
                    }
                </span>
                <p>
                    {
                        olympiad.access === 'public' ?
                            'Принять участие может любой желающий.' :
                            olympiad.access === 'invite' ?
                                'Принять участие смогут ученики которых вы приняли заявки.' :
                                'Принять участие смогут только те ученики которых вы пригласили.'
                    }
                    </p>
            </div>
        </AccessWrapper>
    );
};

export default Access;