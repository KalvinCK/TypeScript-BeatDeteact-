import Program from "../lib/Program";

export namespace Buffers
{
    export class BufferObject
    {

        private GL = Program.GL;
        private Handle: WebGLBuffer;
        private bufferType

        constructor(vertexArray: Float32Array, buffer_type: number)
        {
            this.bufferType = buffer_type;
            
            this.Handle = this.GL.createBuffer();
            this.Bind();
            this.GL.bufferData(this.bufferType, vertexArray, this.GL.STATIC_DRAW);

        }
        Bind()
        {
            this.GL.bindBuffer(this.bufferType, this.Handle);
        }
        Delete()
        {
            this.GL.deleteBuffer(this.Handle);
        }
    }
    export class VertexArrayObject
    {
        private GL = Program.GL;
        private Handle: WebGLVertexArrayObject;
    
        constructor()
        {
            this.Handle = this.GL.createVertexArray();
            this.Bind();
        }
        LinkBuffer(bufferObject : BufferObject)
        {
            this.Bind();
            bufferObject.Bind();
        }
        VertexAtributePointer(index: number, count: number, type: number, vertexSize: number, offSet: number)
        {
            this.GL.vertexAttribPointer(index, count, type, false, vertexSize, offSet);
            this.GL.enableVertexAttribArray(index);
        }
        Bind()
        {
            this.GL.bindVertexArray(this.Handle);
        }
        Delete()
        {
            this.GL.deleteVertexArray(this.Handle);
        }
    }
    
}