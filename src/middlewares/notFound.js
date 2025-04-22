const notFound = (req, res, next) => {
    const error = new Error(`Resource not found: ${req.originalUrl}`); //ค่า URL ดั้งเดิมที่ไคลเอนต์เรียกมา
    error.status = 404;
    next(error);
  };
  
  module.exports = notFound;
  