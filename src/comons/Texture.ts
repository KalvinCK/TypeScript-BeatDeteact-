import Program from "../lib/Program";

// essa classe e ausada para carregar texturas, facilitando bastante a nossa vida 
export default class Texture
{
    private GL = Program.GL;
    private handle: WebGLTexture; 
    private Unit: number;
    // init 
    constructor(img_url: string, unit: number)
    {
        this.Unit = unit;
        // criamos o buffer de textura
        this.handle = this.GL.createTexture();
        this.GL.bindTexture(this.GL.TEXTURE_2D, this.handle);
        
        this.GL.pixelStorei(this.GL.UNPACK_FLIP_Y_WEBGL, true);
        
        
        const img = new Image();
        img.src = img_url;
        
        
        img.onload = () =>
        {

            const internalFormat = this.GL.RGBA;
            const format = this.GL.RGBA;
            const type = this.GL.UNSIGNED_BYTE;


            this.GL.bindTexture(this.GL.TEXTURE_2D, this.handle);
            this.GL.texImage2D(this.GL.TEXTURE_2D, 0, internalFormat, img.width, img.height, 0, format, type, img);


            this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_WRAP_S, this.GL.CLAMP_TO_EDGE);
            this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_WRAP_T, this.GL.CLAMP_TO_EDGE);
            this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_MIN_FILTER, this.GL.LINEAR);
            this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_MAG_FILTER, this.GL.LINEAR);
    
            this.GL.generateMipmap(this.GL.TEXTURE_2D);
        }
    }
    public get Use(): number
    {
        return this.useTexture();
    }
    private useTexture(): number
    {
        this.GL.activeTexture(this.Unit);
        this.GL.bindTexture(this.GL.TEXTURE_2D, this.handle);
        return this.Unit;
    }
    Delete()
    {
        this.GL.deleteTexture(this.handle);
    }
}