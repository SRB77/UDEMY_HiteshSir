const ApiResponse = require('../utils/api-response.js');
const asyncHandler = require('../utils/async-handler.js');
/*
const healthCheck = async(req,res,next)=>{
    try {
        const user = await getUserFromDB()
        res.status(200).json(
            new ApiResponse(200,"Everything looking fine just to test the data ",{message:"Server is running"})
        );
    } catch (error) {
        next(err)
    }
}
*/

const healthCheck = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(
      new ApiResponse(200, 'Everything seems fine no data yer', {
        message: 'Server is running Perfectly',
      }),
    );
});

module.exports = healthCheck;
