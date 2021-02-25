import { useState } from 'react'
import './App.css';
import { Button, Input, CircularProgress } from '@material-ui/core'
import axios from 'axios'
function App() {

  const [img, setImage] = useState([]);
  const [imgurl, setImgurl] = useState();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setImage(e.target.files[0]);
    setImgurl(URL.createObjectURL(e.target.files[0]))
  }

  const onClick = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', img);
    // 서버의 upload API 호출
    const res = await axios.post("http://localhost:5000/predict", formData);
    setResult(res.data.class_name)
    setLoading(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>React App for Image Classification</h2>
        <Input type='file' onChange={onChange} />
        <br />
        <img src={imgurl} width='150px'/>
        <br />
        <Button onClick={onClick} variant="contained" color="primary">
          Upload
        </Button>
        <br />
        {
          loading ? (
            <CircularProgress />
          ) :
            result ?
              <div>결과 : {result}</div>
              :
              <div></div>
        }
      </header>
    </div>
  );
}

export default App;
