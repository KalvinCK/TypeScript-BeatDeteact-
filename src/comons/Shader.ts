import { vec2, vec3, vec4, mat4 } from "gl-matrix";
import Program from "../lib/Program";

// Essa classe e feita de forma para facilitar a forma de como utilizamos os nossos shaders

//-------------------------------------------------------------------
export default class Shader
{
    // atributos privados
    private GL = Program.GL;
    private Handle: WebGLProgram;
    private uniformLocations = new Map<string, WebGLUniformLocation>();

    // init contructor
    // ------------------------------------------------------------------------
    constructor(vert_shader: string, frag_shader: string)
    {
        // compila os shaders
        const vertexShader = this.CompileShader(vert_shader, this.GL.VERTEX_SHADER);
        const fragmentShader = this.CompileShader(frag_shader, this.GL.FRAGMENT_SHADER);

        // criamos o programaShader principal
        this.Handle = this.GL.createProgram();   
        
        // anexa os dois shaders que acabamos de criar ao programa principal
        this.GL.attachShader(this.Handle, vertexShader);
        this.GL.attachShader(this.Handle, fragmentShader);

        // compile o program principal
        this.GL.linkProgram(this.Handle);
        
        // desanexa e apague os dois shader pois eles ja foram vinculados ao programa principal
        this.GL.detachShader(this.Handle, vertexShader);
        this.GL.detachShader(this.Handle, fragmentShader);
        this.GL.deleteShader(vertexShader);
        this.GL.deleteShader(fragmentShader);
    
        // verifica se o shader está ok!
        if (!this.GL.getProgramParameter(this.Handle, this.GL.LINK_STATUS)) 
        {
            console.log('Erro ao iniciar o ShaderProgram ' + this.GL.getProgramInfoLog(this.Handle));
        }
        
        // ---------------------------------------------------------------
        // agora vamos salvar todos os nossos unifoms
        // porque é bem pesado acessá-los durante a rederização.
        this.uniformLocations = new Map();
        var countUniforms = this.GL.getProgramParameter(this.Handle, this.GL.ACTIVE_UNIFORMS);
        
        for(let i = 0; i < countUniforms; ++i)
        {
            // const info = new WebGLActiveInfo();
            const info = this.GL.getActiveUniform(this.Handle, i);
            const uniform = this.GL.getUniformLocation(this.Handle, info.name); 
            
            if(info.size > 1)
            {
                for(let j = 0; j < info.size; j++)
                {
                    const arrayName = `${info.name.substring(0, info.name.length - 2)}${j}]`;
                    const arrayUniform = this.GL.getUniformLocation(this.Handle, arrayName); 

                    this.uniformLocations.set(arrayName, arrayUniform);                    
                }
            }
            else
            {

                this.uniformLocations.set(info.name, uniform);
            }
        }
    }
    // ------------------------------------------------------------------------
    // parte privada
    private CompileShader(shader_code: string, type : number) 
    {
        const shader = this.GL.createShader(type);

        
        this.GL.shaderSource(shader, shader_code);
        
        this.GL.compileShader(shader);
        
        var result = this.GL.getShaderParameter(shader, this.GL.COMPILE_STATUS);
        if (result) 
        {
            return shader;
        }
        else
        {
            var type_text = "";
            if(type === this.GL.VERTEX_SHADER)
            {
                type_text = "Vertex Shader";
            }
            else if(type === this.GL.FRAGMENT_SHADER)
            {
                type_text = "Fragment Shader";
            }
            console.log(`Erro ao compilar o shader: ${type_text} ${this.GL.getShaderInfoLog(shader)}`);
            this.GL.deleteShader(shader);
            return null;
        }
    }
    // ------------------------------------------------------------------------
    // ativa o estado do shader
    Use()
    {
        this.GL.useProgram(this.Handle);
    }
    // deleta o programa shader
    Delete()
    {
        this.GL.deleteShader(this.Handle);
    }

    // ------------------------------------------------------------------------
    // serao usados para setar dados nos nossos shaders, como vc pode ver podemos enviar qualquer tipo de valor
    AttributeLocation(attribute_name: string) : GLint
    {
        return this.GL.getAttribLocation(this.Handle, attribute_name);
    }
    setBool(name: string, value: boolean)
    {
        this.GL.uniform1i(this.uniformLocations.get(name), value ? 1 : 0);
    }
    setNumber(name: string, value: number)
    {
        this.GL.uniform1i(this.uniformLocations.get(name), value);
    }
    setVec2(name: string, value: vec2)
    {
        this.GL.uniform2fv(this.uniformLocations.get(name), value);
    }
    setVec3(name: string, value: vec3)
    {
        this.GL.uniform3fv(this.uniformLocations.get(name), value);
    }
    setVec4(name: string, value: vec4)
    {
        this.GL.uniform4fv(this.uniformLocations.get(name), value);
    }
    setColor4(name: string, value: number[])
    {
        this.GL.uniform4fv(this.uniformLocations.get(name), value);
    }
    setMatrix4(name: string, value: mat4)
    {
        this.GL.uniformMatrix4fv(this.uniformLocations.get(name), false, value);
    }

}