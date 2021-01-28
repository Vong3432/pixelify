import Head from 'next/head'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import Button from '../components/common/Button';
import { AlertContext } from '../context/AlertContext';
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {

  const canvasref = useRef(null);
  const imageRef = useRef(null);
  const [palleteIsEmpty, setPalleteIsEmpty] = useState<boolean>(true)
  const [file, setFile] = useState<File>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const ref = useRef(null);

  const { dispatchAlert } = useContext(AlertContext);

  const pixelizeToCan = async () => {

    function pixelate() { 
      c.height = img.height; 
      c.width = img.width;

      const size = 5 * 0.01;
      const w = c.width * size, h = c.height * size;

      ctx.drawImage(img, 0, 0, w, h);
      ctx.mozImageSmoothingEnabled = false; 
      ctx.imageSmoothingEnabled = false; 
      ctx.drawImage(c, 0, 0, w, h, 0, 0, c.width, c.height);
    }         
    
    let c = canvasref.current;
    let img = imageRef.current;
    c.height = img.height / 4 ;
    c.width = img.width / 4;
    let ctx = c.getContext("2d");        

    // ctx.clearRect(0, 0, c.width, c.height)
    ctx.drawImage(img, 0, 0, c.width, c.height);
    await pixelate();
    setPalleteIsEmpty(false);
       
  }

  const triggerInputFile = () => {
    console.log('clicked')
    console.log(ref)
    ref.current.click()
  };

  /*
    TODO: Copy canvas to clipboard
  */
  const copyCanvas = () => {
    const range = document.createRange();
    range.selectNode(canvasref.current);
    window.getSelection().addRange(range);

    console.log(range)

    try {
      // Now that we've selected the anchor text, execute the copy command
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copy email command was ' + msg);
    } catch(err) {
      console.log('Oops, unable to copy');
    }

    // Remove the selections - NOTE: Should use
    // removeRange(range) when it is supported
    window.getSelection().removeAllRanges();
  } 

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFile = e.target.files[0];

    console.log(selectedFile)

    if (!selectedFile)
      return;

    if (!selectedFile.type.match(/.(jpg|jpeg|png)$/i))
      return dispatchAlert({ type: "ADD_ALERT", payload: { text: "File is not image", type: "danger" } });

    setPalleteIsEmpty(true);    
    setFile((prev: File) => selectedFile);
  }

  const resetCanvas = () => {
    let c = canvasref.current;    
    let ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);
  }

  useEffect(() => {

    if (!file) {
      setImageSrc(null)
      return;
    }

    const objectUrl = URL.createObjectURL(file)
    setImageSrc(objectUrl);

    resetCanvas();

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  return (
    <div className={styles.container}>
      <Head>
        <title>Pixelify</title>
        <meta name="description" content="Pixelize your image for free online." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`bg-white rounded-2xl shadow-xl grid xl:grid-cols-2 gap-4 min-h-screen my-20 md:w-full max-w-screen-xl`}>
        <div className="flex flex-col py-5 px-5 md:px-10">
          <label className="block my-2 text-xl font-bold text-gray-700">
            Your image:
          </label>
          {file && (
            <img ref={imageRef} className="rounded-md my-4 shadow-lg" src={imageSrc} />
          )}
          <div className="mt-2 flex items-center flex-col flex-grow justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 w-full flex flex-col justify-center text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div className="flex items-center justify-center text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 font-extrabold text-gray-600 py-2 rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input ref={ref} accept="image/*" id="file-upload" name="file-upload" onChange={e => change(e)} type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="pb-10 text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
              {file && (
                <div className="flex flex-col lg:flex-row">
                  <Button onClick={() => pixelizeToCan()} tailwindClasses="flex-1 m-1 text-white" type="primary" text="Pixelize" />
                  <Button onClick={() => triggerInputFile()} tailwindClasses="flex-1 m-1" type="secondary" text="Upload another image" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t-2 xl:border-t-0 rounded-b-2xl xl:rounded-b-none xl:rounded-r-2xl bg-gray-700 text-white md:border-l-2 p-5 md:px-10 pb-10 flex flex-col">
          <label className="block text-xl font-bold my-2">
            Pixelized image result:
          </label> 
          
          <canvas className="mt-4" style={{objectFit: 'contain'}} id="canvas" ref={canvasref}></canvas>          
          { !palleteIsEmpty && <div className="flex items-start mt-4">            
            {/* <button onClick={() => copyCanvas()} className={`mr-2 py-3 rounded-lg px-4 bg-gray-500 hover:bg-indigo-700 font-extrabold `}>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </button>  */}
            <Link href={canvasref.current.toDataURL('image/png')}>
              <a download={`pixelify-${file.name}`} className={` py-3 rounded-lg px-4 bg-gray-500 hover:bg-indigo-700 font-extrabold `}>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </Link>            
             
          </div>}
          
        </div>
      </main>

    </div >
  )
}
