import { AddIntoHistory, GetHistory } from "../utils/history.js";
import {z} from "zod/v4";
import { NewHistorySchema, PossibleSearchParams, UpdateHistorySchema } from "../validation/history.validation.js";

const historyController = {
    handleAddHistory: async function (req, res){
        // TODO: body should be validated
        try{
        const data = req.body;
        const newDate = new Date(data.date);
        data.date = newDate;
        const validatedData = NewHistorySchema.parse(data);
        AddIntoHistory(validatedData);
        return res.status(200).json({"MSG": "Added data successfully!"});
        } catch(error) {
            if(error instanceof z.ZodError){
                console.log(error.issues);
                // to add error specific message
                res.status(400).send(error.issues[0].path[0]+" "+error.issues[0].message);
            }
        }
    },
    handleGetHistory: async function (req, res){
        // TODO: search params should be validated
        try{
        const {type} = req.query;
        const validatedType = PossibleSearchParams.parse(type);
        const historyToReturn = GetHistory(validatedType);
        return res.status(200).json({"DATA": historyToReturn});
        } catch(error) {
            if(error instanceof z.ZodError){
                console.log(error.issues);
                // to add error specific message
                res.status(400).send(error.issues[0].path[0]+" "+error.issues[0].message);
            }
        }
    },
    handleUpdateHistory: async function (req, res){
        // TODO: body should be validated
        try{
        const data = req.body;
        const validatedData = UpdateHistorySchema.parse(data);
        } catch(error) {
            if(error instanceof z.ZodError){
                console.log(error.issues);
                // to add error specific message
                res.status(400).send(error.issues[0].path[0]+" "+error.issues[0].message);
            }
        }
    },
}

export default historyController;