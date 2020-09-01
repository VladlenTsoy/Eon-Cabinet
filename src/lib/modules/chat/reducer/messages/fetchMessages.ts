import {Contact} from "../../interfaces/Contact"
import {createAsyncThunk} from "@reduxjs/toolkit"
import {CommonThunkProps} from "../../../../../store/common/store"
import {Message} from "../../interfaces/Message"
import {firestore} from "../../../../../bin/firebase"

type ReturnedType = any

interface AgrProps {
    contact_id: Contact['profile']['id']
}

export const fetchMessages = createAsyncThunk<ReturnedType, AgrProps, CommonThunkProps>(
    "messages/fetch",
    async (_, {signal}) => {
        const promise = await firestore.collection('messages').get().then(snapchat => {
            // console.log(snapchat)
            return []
        })
        // console.log(promise)
        return promise
    },
    {
        condition(_, {getState}) {
            // const {group} = getState();
            return true
        }
    }
)