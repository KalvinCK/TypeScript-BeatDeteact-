
export default class Program
{
    private static canvas = document.createElement("canvas");
    private static Gl: WebGL2RenderingContext;
    public static Size = { Width: null as number, Height: null as number}
    static Init()
    {
        this.Size.Width = window.innerWidth;
        this.Size.Height = window.innerHeight;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 5;
        document.body.appendChild(this.canvas);

        this.Gl = this.canvas.getContext("webgl2");

        if(!this.Gl)
        {
            alert("O navegador não suporta webgl2");
        }

    }
    public static ResizeDisplay(width: number, height: number)
    {
        this.Size.Width = width;
        this.Size.Height = height;

        this.canvas.width = width;
        this.canvas.height = height - 5;

        this.Gl.viewport(0, 0, width, height);
    }
    public static get Canvas(): HTMLCanvasElement
    {
        return this.canvas;
    }
    public static get GL(): WebGL2RenderingContext
    {
        return this.Gl;
    }
}