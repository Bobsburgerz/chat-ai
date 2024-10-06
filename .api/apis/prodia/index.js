import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';
class SDK {
    constructor() {
        this.spec = Oas.init(definition);
        this.core = new APICore(this.spec, 'prodia/1.3.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config) {
        this.core.setConfig(config);
    }
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values) {
        this.core.setAuth(...values);
        return this;
    }
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url, variables = {}) {
        this.core.setServer(url, variables);
    }
    /**
     * Use this endpoint to start generating an image on Prodia.
     *
     * @summary Create a generation
     */
    generate(body) {
        return this.core.fetch('/sd/generate', 'post', body);
    }
    /**
     * Use this endpoint to do an 'img2img' style generation.
     *
     * @summary Transform an existing image
     */
    transform(body) {
        return this.core.fetch('/sd/transform', 'post', body);
    }
    /**
     * Use this endpoint to do an inpaint generation.
     *
     * @summary Inpaint an existing image
     */
    inpainting(body) {
        return this.core.fetch('/sd/inpainting', 'post', body);
    }
    /**
     * Use this endpoint to do a Controlnet generation.
     *
     * @summary Create a Controlnet generation
     */
    controlnet(body) {
        return this.core.fetch('/sd/controlnet', 'post', body);
    }
    /**
     * Get a list of current available SD 1.X models.
     *
     * @summary Retrieve a list of available SD 1.X models
     */
    listModels() {
        return this.core.fetch('/sd/models', 'get');
    }
    /**
     * Get a list of current available SD 1.X samplers.
     *
     * @summary Retrieve a list of available SD 1.X samplers.
     */
    listSamplers() {
        return this.core.fetch('/sd/samplers', 'get');
    }
    /**
     * Get a list of current available SD 1.X loras.
     * General Usage notation inside of a prompt: <lora:LoraName:weight>
     *
     * @summary Retrieve a list of available SD 1.X loras
     */
    listLoras() {
        return this.core.fetch('/sd/loras', 'get');
    }
    /**
     * Get a list of current available SD 1.X embeddings.
     *
     * @summary Retrieve a list of available SD 1.X embeddings
     */
    listEmbeddings() {
        return this.core.fetch('/sd/embeddings', 'get');
    }
    /**
     * Use this endpoint to start generating an image on Prodia.
     *
     * @summary Create an SDXL generation
     */
    sdxlGenerate(body) {
        return this.core.fetch('/sdxl/generate', 'post', body);
    }
    /**
     * Use this endpoint to do an 'img2img' style generation.
     *
     * @summary Transform an existing image
     */
    sdxlTransform(body) {
        return this.core.fetch('/sdxl/transform', 'post', body);
    }
    /**
     * Use this endpoint to do an inpaint generation.
     *
     * @summary Inpaint an existing image
     */
    sdxlInpainting(body) {
        return this.core.fetch('/sdxl/inpainting', 'post', body);
    }
    /**
     * Get a list of current available SDXL models.
     *
     * @summary Retrieve a list of available SDXL models
     */
    listSdxlModels() {
        return this.core.fetch('/sdxl/models', 'get');
    }
    /**
     * Get a list of current available SDXL samplers.
     *
     * @summary Retrieve a list of available SDXL samplers
     */
    listSdxlSamplers() {
        return this.core.fetch('/sdxl/samplers', 'get');
    }
    /**
     * Get a list of current available SDXL loras.
     * General Usage notation inside of a prompt: <lora:LoraName:weight>
     *
     * @summary Retrieve a list of available SDXL loras
     */
    listSdxlLoras() {
        return this.core.fetch('/sdxl/loras', 'get');
    }
    /**
     * Get a list of current available SDXL embeddings.
     *
     * @summary Retrieve a list of available SDXL embeddings.
     */
    listSdxlEmbeddings() {
        return this.core.fetch('/sdxl/embeddings', 'get');
    }
    /**
     * Create a higher resolution version an image.
     *
     * @summary Upscale An Image
     */
    upscale(body) {
        return this.core.fetch('/upscale', 'post', body);
    }
    /**
     * Swap a face inside an image (sourceUrl) with another (targetUrl).
     *
     *
     * @summary Face Swap
     */
    faceswap(body) {
        return this.core.fetch('/faceswap', 'post', body);
    }
    /**
     * Restore and enhance the face inside an image.
     *
     *
     * @summary Face Restore
     */
    facerestore(body) {
        return this.core.fetch('/facerestore', 'post', body);
    }
    /**
     * Generate images with character consistency.
     *
     *
     * @summary PhotoMaker
     */
    photomaker(body) {
        return this.core.fetch('/photomaker', 'post', body);
    }
    /**
     * Get information about a generation job, including status.
     *
     * @summary Retrieve a generation
     */
    getJob(metadata) {
        return this.core.fetch('/job/{jobId}', 'get', metadata);
    }
}
const createSDK = (() => { return new SDK(); })();
export default createSDK;
