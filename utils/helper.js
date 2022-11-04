const {compute} = require('./nlp')


function arithOperation(params, x, y) {
   switch (params) { 
       case 'addition':
           return x + y;

        case 'subtraction':
            return x - y;
            
        case 'multiplication':
            return x * y;
            
        default:
            break    
   }
}

const performArithOpt = async (req, res, next) => {
    const operation_type = req.body.operation_type
    const x = req.body.x * 1
    const y = req.body.y * 1
    try {
        if (!operation_type){
            return res.status(404).json({
                status: false,
                msg: 'Invalid Operation'
            })
        }
        let lowerOptType = operation_type.toLowerCase()
        let result;
        if (!x || !y){
            let answer = await compute(lowerOptType.replace('x', x).replace('y', y)) //run openAI model on the word
            let first_num = parseInt(lowerOptType.replace('x', x).replace('y', y).replace(/\D/g,' z ').match(/\d+/g)?.[0]);
            let second_num = parseInt(lowerOptType.replace('x', x).replace('y', y).replace(/\D/g,' z ').match(/\d+/g)?.[1]);
            
         

            if(Math.round(first_num + second_num) == Math.round(answer)) lowerOptType = 'addition'
            else if(Math.round(first_num - second_num) == Math.round(answer)) lowerOptType = 'subtraction'
            else if(Math.round(second_num - first_num) == Math.round(answer)) lowerOptType = 'subtraction'
            else if(Math.round(first_num * second_num) == Math.round(answer)) lowerOptType = 'multiplication'
            else lowerOptType = lowerOptType
            

            return res.status(200).json({
                slackUsername: 'eddy.js',
                result: parseFloat(answer),
                operation_type: lowerOptType
            })
        } else {
            if (operation_type && x && y){
                const opts = ["addition", "subtraction", "multiplication"];
                const checkOpts = opts.indexOf(lowerOptType)
    
                if(checkOpts != -1) {
                    result = arithOperation(lowerOptType, x,  y)
                    return res.status(200).json({
                    slackUsername: "eddy.js",
                    operation_type: lowerOptType,
                    result
                })
                }
            }
        }

        
        // const opts = ["addition", "subtraction", "multiplication"];
        // const checkOpts = opts.indexOf(lowerOptType)

        // if (checkOpts > -1) {
        //     result = arithOperation(lowerOptType, x,  y)
        //     return res.status(200).json({
        //     slackUsername: "eddy.js",
        //     operation_type: lowerOptType,
        //     result})

        // }   

        
    } catch (error) {
        console.log(error)
        next()
    }
}

module.exports = performArithOpt;