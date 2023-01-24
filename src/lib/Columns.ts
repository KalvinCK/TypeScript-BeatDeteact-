import { mat4, vec2, vec3, vec4 } from "gl-matrix";

import Shader from "../comons/Shader";
import { Meshes } from "./Meshes";

import * as vertex_code from "../shaders/vert.vert";
import * as fragment_code from "../shaders/frag.frag";
import Colors from "../comons/Colors";
import Camera from "./Camera";


export default class Columns
{
    private shader: Shader;

    private model = mat4.create();
    private position = vec3.create();
    private scale = vec3.create();

    constructor()
    {
        this.shader = new Shader(vertex_code.default, fragment_code.default);
    }
    public Render(size: number, postionX: number, color4: vec4)
    {
        this.model = mat4.create();
    
        vec3.set(this.scale, 0.7, 2.0 + size, 1.0);
        mat4.scale(this.model, this.model, this.scale);
        
        vec3.set(this.position, postionX, 0.0, -20.0);
        mat4.translate(this.model, this.model, this.position);


        this.shader.Use();
        this.shader.setMatrix4("projection", Camera.ProjectionMatrix);
        this.shader.setMatrix4("model", this.model);
        this.shader.setVec4("color", color4);

        Meshes.Quad.Render();
    }
}