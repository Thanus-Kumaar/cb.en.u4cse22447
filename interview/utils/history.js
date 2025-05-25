
// each value in the history is {name, qty, cals...}
let history = [];

const AddIntoHistory = (data)=>{
    history.push(data);
}

const GetHistory = (type) => {
    if(type=="all") {
        return history;
    }
    switch(type) {
        case "cal":
            const newHistory = history.map((val)=>{
                return {name: val.name, calories: val.calories, date: val.date}
            })
            return newHistory;
        case "carb":
            return history.map((val)=>{
                return {name: val.name, ca: val.calories, date: val.date}
            })
        case "protein":
            return history.map((val)=>{
                val.name, val.proteins, val.date
            })
        case "weight":
            return history.map((val)=>{
                val.name, val.weight, val.date
            })
        case "fat":
            return history.map((val)=>{
                val.name, val.fat, val.date
            })
        case "qty":
            return history.map((val)=>{
                val.name, val.qty, val.date
            })
    }
}

const EditHistory = (updatedHistory, date) => {
    
}

export {
    AddIntoHistory, GetHistory, EditHistory
}