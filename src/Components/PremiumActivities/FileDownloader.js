import { Link } from 'react-router-dom';
import { TiDocumentAdd } from 'react-icons/ti';
import { TiDownload } from 'react-icons/ti';
import { FaDownload } from 'react-icons/fa';

const FileDownloader = ({props, className}) => {
    const data = props.props;

    const makeCsv = (data) => {
        // Transform data into an array of arrays
        const transformedData = data.map(obj => Object.values(obj));     
        // Convert array of arrays into CSV string
        return transformedData.map(row => row.join(',')).join('\n');
    };

    const handleCsvDownload = () => {
        const csvData = makeCsv(data);
        const blob = new Blob([csvData], { type: 'text/plain' });
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.setAttribute('download', 'data.csv');
        // Simulate click to trigger download
        downloadLink.click();
    };

    return (
        <div className={className}>
            <button className='mt-3' id='d2' onClick={handleCsvDownload}><Link to="#"></Link><FaDownload></FaDownload></button>
            <a id="download-link" style={{ display: 'none' }}></a> {/* Hidden anchor tag for download */}
        </div>
    );
};

export default FileDownloader;
