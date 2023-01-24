import { Buffers } from "../buffers/Buffers";
import Program from "./Program";

export namespace Meshes
{
    export class Quad
    {
        private static GL: WebGL2RenderingContext;
        private static Vao: Buffers.VertexArrayObject;
        private static Vbo: Buffers.BufferObject;
    
        public static Render()
        {
            
            if(this.Vao == null)
            {
                this.GL = Program.GL;

                const positions = 
                [
                    // positions        // texture Coords
                    -1.0,  1.0, 0.0,    0.0, 1.0,
                    -1.0, -1.0, 0.0,    0.0, 0.0,
                     1.0,  1.0, 0.0,    1.0, 1.0,
                     1.0, -1.0, 0.0,    1.0, 0.0,
                ];
    
                this.Vao = new Buffers.VertexArrayObject();
                this.Vbo = new Buffers.BufferObject(new Float32Array(positions), this.GL.ARRAY_BUFFER);
    
                this.Vao.LinkBuffer(this.Vbo);
        
                this.Vao.VertexAtributePointer(0, 3, this.GL.FLOAT, 5 * 4, 0);
                this.Vao.VertexAtributePointer(1, 2, this.GL.FLOAT, 5 * 4, 3 * 4);
    
            }

            this.Vao.Bind();
            this.GL.drawArrays(this.GL.TRIANGLE_STRIP, 0, 4);

        }
    }
}