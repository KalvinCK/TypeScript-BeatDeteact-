import { mat4, vec3 } from "gl-matrix";
import Program from "./Program";


export default class Camera
{
    public static position = vec3.create();

    private static createProjection() : mat4
    {
        const ProjectionMatrix = mat4.create();
        
        const fieldOfView = 90 * Math.PI / 180;   // in radians
        const aspect = Program.Size.Width / Program.Size.Height;
        
        mat4.perspective(ProjectionMatrix, fieldOfView, aspect, 0.0, 100.0);
        
        this.position = vec3.create();
        vec3.set(this.position, 0.0, 0.0, -210.0);
        mat4.translate(ProjectionMatrix, ProjectionMatrix, this.position);
        
        return ProjectionMatrix;
    }
    public static get ProjectionMatrix(): mat4
    {
        return this.createProjection();
    }
}