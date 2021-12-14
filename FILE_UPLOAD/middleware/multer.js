//이미지 저장되는 위치 설정
const path = require('path');
const uploadDir = path.join(__dirname, '../public/uploads'); // 루트의 uploads위치에 저장한다.

//multer 셋팅
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //이미지가 저장되는 도착지 지정
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    // body가 빈값이므로, 해당 필드에서 filename을 추출
    const name = file.originalname.split('.')[0];
    callback(null, name + '.' + file.mimetype.split('/')[1]);
  },
});

module.exports = multer({ storage: storage });
