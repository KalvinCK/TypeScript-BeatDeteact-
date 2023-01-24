
export default class Music
{
    private audioContext: AudioContext;
    private audioSource: AudioBufferSourceNode;
    private audioBuffer: AudioBuffer;

    private analyser: AnalyserNode;
    
    private _start = true;
    
    private gainNode: GainNode;

    private _bufferLenght: number;
    private _dataArray: Uint8Array;

    constructor(url: string)
    {
        this.audioContext = new AudioContext();
        this.Load(url);
    }
    private Load(url: string)
    {
        const request = new XMLHttpRequest();
        request.responseType = "arraybuffer";

        try
        {
            request.open('get', url, true);
        }
        catch
        {
            alert("Não foi possivel carregar o audio");
        }

        request.onload = () =>
        {
            this.audioContext.decodeAudioData(request.response, (buffer) =>
            {
                this.audioBuffer = buffer;
            });
        }
        request.send();

    }
    PlaySound()
    {
        if(this._start)
        {
            this.audioSource = this.audioContext.createBufferSource();
            this.audioSource.buffer = this.audioBuffer;
            this.audioSource.connect(this.audioContext.destination);
            
            this.gainNode = this.audioContext.createGain();
            this.audioSource.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);
            
            this.analyser = this.audioContext.createAnalyser();
            this.audioSource.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            
            this.analyser.fftSize = 512;
            this._bufferLenght = this.analyser.frequencyBinCount;
            this._dataArray = new Uint8Array(this._bufferLenght);

            this.audioSource.start();
            

            this._start = false;
        }
    }
    get BufferLenght(): number
    {
        return this._bufferLenght;
    }
    get DataArray(): Uint8Array
    {
        return this._dataArray;
    }
    get Start(): boolean
    {
        return this._start;
    }
    ByteFrequencyData()
    {
        this.analyser.getByteFrequencyData(this.DataArray);
    }
    ControlerVolume(volume: number)
    {
        if(!this._start)
        {
            this.gainNode.gain.value = volume;
        }
    }
    StopSound()
    {
        if(!this._start)
        {
            this.audioSource.stop();
            this._start = true;
        }
    }
}