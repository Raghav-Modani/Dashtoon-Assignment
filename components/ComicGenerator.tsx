// components/ComicGenerator.tsx
import React, { use, useState } from 'react';

interface ComicGeneratorProps {
  apiKey: string;
}

export default function ComicGenerator( { apiKey } :any ) {
    const [textInput, setTextInput] = useState('');
    const [comicPanels, setComicPanels] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGenerateComic = async () => {
        console.log(comicPanels.length);
        if(comicPanels.length > 9) {
            return;
        }
        try {
            setLoading(true);
            const response = await query({ inputs: textInput });
            const imageUrl = URL.createObjectURL(response);
            setComicPanels((prevPanels) => [...prevPanels, imageUrl]);
        } 
        catch (error) {
        console.error('Error generating comic:', error);
        }
        finally{
            setLoading(false);
        }
    };

    async function query(data: { inputs: string }): Promise<Blob> {
        const response = await fetch(
        'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud',
        {
            headers: {
            Accept: 'image/png',
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
        }
        );
        const result = await response.blob();
        return result;
    }
    const removePanel = (index :number) => {
        console.log(index);
        const newArray = [...comicPanels.slice(0 , index), ...comicPanels.slice(index+1)]
        setComicPanels(newArray);
    }
    return (
        <div className = 'container text-center'>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <input 
                            type="text"
                            className="form-control me-2"
                            placeholder="Enter a prompt to generate a comic panel" 
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button 
                                className="btn btn-primary" 
                                type="button"
                                onClick={handleGenerateComic}
                                disabled={loading}
                                >
                                {loading ? 
                                <>
                                 <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                 <span role="status"> Generating...</span>
                                </>
                                 : 
                                 'Generate Comic Panel'
                                 }
                                </button>
                            </div>
                        </div>
                        {comicPanels.length > 9 
                         ? 
                         <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            You can generate upto 10 comic panels only!!.
                         </div>
                         : 
                         <></>
                        }
                    </div>
                </div>
            </div>
            <div className='row row-cols-2 row-cols-md-5 g-4 mt-3'>
                {comicPanels.map((panel, index) => (
                    <div key={index} className="col">
                        <div className="card">
                            <img src={panel} className="card-img-top" alt={`Comic Panel ${index + 1}`} />
                            <div className="card-body py-1">
                                <button className='btn btn-danger' onClick={() => removePanel(index)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

