// essa classe pode ser utilizado para varias tarefas inclusive games, 
// como vc pode ver temos alguns atributos bem interessantes

// para usar ela crie uma instancia no arquivo principal e pronto.
// como os atributos são estáticos não e nescessario usar nenhuma instacia para utilizalos

export default class Timer 
{
    private static _Time = 0.0;
    private static _ElapsedTime = 0.0;
    private static _Frames = 0.0;

    private static then = 0.0;
    private static framecount = 0.0;
    private static previoustime = 0.0;

    constructor()
    {
        requestAnimationFrame(Timer.Update)
    }

    private static Update(now: number) 
    {
        now *= 0.001;
        Timer._ElapsedTime = now - Timer.then;
        Timer.then = now;
        
        Timer._Time += Timer._ElapsedTime;
        
        Timer.framecount++;
        if(Timer._Time - Timer.previoustime >= 1.0)
        {
            Timer._Frames = Timer.framecount;
            Timer.framecount = 0;
            Timer.previoustime = Timer._Time;
        }
        
        requestAnimationFrame(Timer.Update);
    }

    public static get Time(): number
    {
        return Timer._Time;
    }
    public static get ElapsedTime(): number
    {
        return Timer._ElapsedTime;
    }
    public static get FramesForSecond(): number
    {
        return Timer._Frames;
    }
}