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

const performArithOpt = (req, res, next) => {
    let {operation_type, x, y} = req.body
    try {
        if (!operation_type || !x || !y){
            return res.status(404).json({
                status: false,
                msg: 'All inputs are required'
            })
        }
        let lowerOptType = operation_type.toLowerCase()
        x = x * 1
        y = y * 1
       
        const opts = ["addition", "subtraction", "multiplication"];
        const checkOpts = opts.indexOf(lowerOptType)

        if(checkOpts === -1) {
            return res.status(404).json({
                status: false,
                msg: "Invalid operation"
            })
        
        }
        const result = arithOperation(lowerOptType, x,  y)
        return res.status(200).json({
        slackUsername: "eddy.js",
        operation_type: lowerOptType,
        result
        }) 
    } catch (error) {
        console.log(error)
        next()
    }
}

module.exports = performArithOpt;