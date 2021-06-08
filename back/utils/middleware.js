//토큰 추출
//에러 후 처리.. res.status .. 


const errorHandling = (err, req,res,next)=>{
  console.err(err)
  res.status(500).json({success:false,err})
} 


module.exports = {errorHandling}