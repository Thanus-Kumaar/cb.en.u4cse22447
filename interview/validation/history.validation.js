import { z } from "zod/v4";

const NewHistorySchema = z.object({
    name: z.string().min(3).max(255),
    qty: z.number().nonnegative(),
    calories: z.number(),
    carbs: z.number(),
    proteins: z.number(),
    fat: z.number(),
    weight: z.number().gt(0),
    date: z.date(),
});

const UpdateHistorySchema = z.object({
    name: z.string().min(3, "").max(255).nullable(),
    qty: z.number().nonnegative().nullable(),
    carbs: z.number().nullable(),
    calories: z.number().nullable(),
    proteins: z.number().nullable(),
    fat: z.number().nullable(),
    weight: z.number().gt(0).nullable(),
    date: z.date(),
}).refine((val)=>{
    (val.name==null && val.qty==null && val.calories==null
        && val.proteins==null && val.fat==null && val.weight==null
    )?false:true
})

const PossibleSearchParams = z.enum(["cal", "carb", "protein", "weight", "fat", "qty", "all"]);

export {NewHistorySchema, UpdateHistorySchema, PossibleSearchParams}