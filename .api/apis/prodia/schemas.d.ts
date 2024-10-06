declare const Controlnet: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["prompt"];
        readonly properties: {
            readonly imageUrl: {
                readonly type: "string";
                readonly description: "Input Image URL. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["https://example.com/image.png"];
            };
            readonly imageData: {
                readonly type: "string";
                readonly description: "Base-64 Encoded Image Data. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["dGhpcyBpcyBhbiBleGFtcGxl"];
            };
            readonly model: {
                readonly type: "string";
                readonly default: "v1-5-pruned-emaonly.safetensors [d7049739]";
                readonly description: "Model Name";
                readonly examples: readonly ["v1-5-pruned-emaonly.safetensors [d7049739]"];
            };
            readonly controlnet_model: {
                readonly enum: readonly ["control_v11p_sd15_canny [d14c016b]", "control_v11f1p_sd15_depth [cfd03158]", "control_v11p_sd15_inpaint [ebff9138]", "control_v11e_sd15_ip2p [c4bb465c]", "control_v11p_sd15_lineart [43d4be0d]", "control_v11p_sd15s2_lineart_anime [3825e83e]", "control_v11p_sd15_mlsd [aca30ff0]", "control_v11p_sd15_normalbae [316696f1]", "control_v11p_sd15_openpose [cab727d4]", "control_v11p_sd15_scribble [d4ba51ff]", "control_v11p_sd15_seg [e1f51eb9]", "control_v11e_sd15_shuffle [526bfdae]", "control_v11p_sd15_softedge [a8575a2a]", "control_v11f1e_sd15_tile [a371b31b]"];
            };
            readonly controlnet_module: {
                readonly enum: readonly ["none", "canny", "depth", "depth_leres", "depth_leres++", "hed", "hed_safe", "mediapipe_face", "mlsd", "normal_map", "openpose", "openpose_hand", "openpose_face", "openpose_faceonly", "openpose_full", "clip_vision", "color", "pidinet", "pidinet_safe", "pidinet_sketch", "pidinet_scribble", "scribble_xdog", "scribble_hed", "segmentation", "threshold", "depth_zoe", "normal_bae", "oneformer_coco", "oneformer_ade20k", "lineart", "lineart_coarse", "lineart_anime", "lineart_standard", "shuffle", "tile_resample", "invert", "lineart_anime_denoise", "reference_only", "reference_adain", "reference_adain+attn", "inpaint", "inpaint_only", "inpaint_only+lama", "tile_colorfix", "tile_colorfix+sharp"];
            };
            readonly control_mode: {
                readonly enum: readonly [0, 1, 2];
                readonly description: "0 - Balanced\n1 - My prompt is more important\n2 - ControlNet is more important";
            };
            readonly threshold_a: {
                readonly type: "number";
                readonly description: "Preprocessor Low Threshold";
                readonly examples: readonly [100];
            };
            readonly threshold_b: {
                readonly type: "number";
                readonly description: "Preprocessor High Threshold";
                readonly examples: readonly [200];
            };
            readonly resize_mode: {
                readonly enum: readonly [0, 1, 2];
            };
            readonly prompt: {
                readonly type: "string";
                readonly description: "Image Prompt";
                readonly examples: readonly ["puppies in a cloud, 4k"];
            };
            readonly negative_prompt: {
                readonly type: "string";
                readonly description: "Negative Image Prompt";
                readonly examples: readonly ["badly drawn"];
            };
            readonly style_preset: {
                readonly enum: readonly ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "neon-punk", "origami", "photographic", "pixel-art", "texture", "craft-clay"];
            };
            readonly steps: {
                readonly type: "number";
                readonly description: "Steps";
                readonly examples: readonly [20];
            };
            readonly cfg_scale: {
                readonly type: "number";
                readonly description: "CFG Scale";
                readonly examples: readonly [7];
            };
            readonly seed: {
                readonly type: "number";
                readonly description: "Seed";
                readonly examples: readonly [-1];
            };
            readonly sampler: {
                readonly type: "string";
                readonly examples: readonly ["DPM++ 2M Karras"];
            };
            readonly width: {
                readonly type: "number";
                readonly minimum: 1;
                readonly maximum: 1024;
                readonly description: "Image Width";
                readonly examples: readonly [512];
            };
            readonly height: {
                readonly type: "number";
                readonly minimum: 1;
                readonly maximum: 1024;
                readonly description: "Image Height";
                readonly examples: readonly [512];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Facerestore: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly imageUrl: {
                readonly type: "string";
                readonly description: "URL of Image containing a face to restore.\n";
                readonly examples: readonly ["https://example.com/image.png"];
            };
            readonly imageData: {
                readonly type: "string";
                readonly description: "Base-64 Encoded Image Data containing a face to restore.\n";
                readonly examples: readonly ["https://example.com/image.png"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Faceswap: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["sourceUrl", "targetUrl"];
        readonly properties: {
            readonly sourceUrl: {
                readonly type: "string";
                readonly description: "Original image URL. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["https://example.com/image.png"];
            };
            readonly targetUrl: {
                readonly type: "string";
                readonly description: "Image containing target face URL. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["https://example.com/image.png"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Generate: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["prompt"];
        readonly properties: {
            readonly model: {
                readonly type: "string";
                readonly description: "Model Name";
                readonly examples: readonly ["v1-5-pruned-emaonly.safetensors [d7049739]"];
            };
            readonly prompt: {
                readonly type: "string";
                readonly description: "Image Prompt";
                readonly examples: readonly ["puppies in a cloud, 4k"];
            };
            readonly negative_prompt: {
                readonly type: "string";
                readonly description: "Negative Image Prompt";
                readonly examples: readonly ["badly drawn"];
            };
            readonly style_preset: {
                readonly enum: readonly ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "neon-punk", "origami", "photographic", "pixel-art", "texture", "craft-clay"];
            };
            readonly steps: {
                readonly type: "number";
                readonly description: "Steps";
                readonly examples: readonly [20];
            };
            readonly cfg_scale: {
                readonly type: "number";
                readonly description: "CFG Scale";
                readonly examples: readonly [7];
            };
            readonly seed: {
                readonly type: "number";
                readonly description: "Seed";
                readonly examples: readonly [-1];
            };
            readonly upscale: {
                readonly type: "boolean";
                readonly description: "Enable 2x Upscale";
                readonly examples: readonly [false];
            };
            readonly sampler: {
                readonly type: "string";
                readonly examples: readonly ["DPM++ 2M Karras"];
            };
            readonly width: {
                readonly type: "number";
                readonly minimum: 1;
                readonly maximum: 1024;
                readonly description: "Image Width";
                readonly examples: readonly [512];
            };
            readonly height: {
                readonly type: "number";
                readonly minimum: 1;
                readonly maximum: 1024;
                readonly description: "Image Height";
                readonly examples: readonly [512];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetJob: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly jobId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of Job";
                };
            };
            readonly required: readonly ["jobId"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Inpainting: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["prompt", "mask_blur", "inpainting_fill", "inpainting_full_res", "inpainting_mask_invert"];
        readonly properties: {
            readonly imageUrl: {
                readonly type: "string";
                readonly description: "Input Image URL. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["https://example.com/image.png"];
            };
            readonly imageData: {
                readonly type: "string";
                readonly description: "Base-64 Encoded Image Data. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["dGhpcyBpcyBhbiBleGFtcGxl"];
            };
            readonly maskUrl: {
                readonly type: "string";
                readonly description: "Input Mask URL. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["https://example.com/mask.png"];
            };
            readonly maskData: {
                readonly type: "string";
                readonly description: "Base-64 Encoded Mask Image Data. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["dGhpcyBpcyBhbiBleGFtcGxl"];
            };
            readonly model: {
                readonly type: "string";
                readonly description: "Model Name";
                readonly examples: readonly ["v1-5-pruned-emaonly.safetensors [d7049739]"];
            };
            readonly prompt: {
                readonly type: "string";
                readonly description: "Inpainting Prompt";
                readonly examples: readonly ["puppies in a cloud, 4k"];
            };
            readonly denoising_strength: {
                readonly type: "number";
                readonly description: "Strength of image transfomation";
                readonly examples: readonly [0.7];
            };
            readonly negative_prompt: {
                readonly type: "string";
                readonly description: "Negative Inpainting Prompt";
                readonly examples: readonly ["badly drawn"];
            };
            readonly style_preset: {
                readonly enum: readonly ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "neon-punk", "origami", "photographic", "pixel-art", "texture", "craft-clay"];
            };
            readonly steps: {
                readonly type: "number";
                readonly description: "Steps";
                readonly examples: readonly [20];
            };
            readonly cfg_scale: {
                readonly type: "number";
                readonly description: "CFG Scale";
                readonly examples: readonly [7];
            };
            readonly seed: {
                readonly type: "number";
                readonly description: "Seed";
                readonly examples: readonly [-1];
            };
            readonly upscale: {
                readonly type: "boolean";
                readonly description: "Enable 2x Upscale";
                readonly examples: readonly [false];
            };
            readonly mask_blur: {
                readonly type: "number";
                readonly description: "Mask Blur Strength";
                readonly examples: readonly [4];
            };
            readonly inpainting_fill: {
                readonly enum: readonly [0, 1, 2, 3];
                readonly description: "\"0 - fill, 1 - original, 2 - latent noise, 3 - latent nothing\"\n";
            };
            readonly inpainting_mask_invert: {
                readonly type: "number";
                readonly description: "0 - Inpaint masked, 1 - Inpaint not masked";
                readonly examples: readonly [1];
            };
            readonly inpainting_full_res: {
                readonly type: "boolean";
                readonly description: "0 - Whole picture, 1 - Only masked";
                readonly examples: readonly [false];
            };
            readonly sampler: {
                readonly type: "string";
                readonly examples: readonly ["DPM++ 2M Karras"];
            };
            readonly width: {
                readonly type: "number";
                readonly minimum: 1;
                readonly maximum: 1024;
                readonly description: "Image Width";
                readonly examples: readonly [512];
            };
            readonly height: {
                readonly type: "number";
                readonly minimum: 1;
                readonly maximum: 1024;
                readonly description: "Image Height";
                readonly examples: readonly [512];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListEmbeddings: {
    readonly response: {
        readonly "200": {
            readonly enum: readonly ["FastNegativeV2", "easynegative"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListLoras: {
    readonly response: {
        readonly "200": {
            readonly enum: readonly ["mib3_v10.safetensors", "age_slider_v20.safetensors", "AstralMecha.safetensors", "GrayClay_V1.5.5.safetensors", "linevichit3-v10.safetensors", "more_details_v10.safetensors", "StealthMecha.safetensors", "eye_size_slider_v1.safetensors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListModels: {
    readonly response: {
        readonly "200": {
            readonly enum: readonly ["absolutereality_V16.safetensors [37db0fc3]", "absolutereality_v181.safetensors [3d9d4d2b]", "analog-diffusion-1.0.ckpt [9ca13f02]", "anythingv3_0-pruned.ckpt [2700c435]", "anything-v4.5-pruned.ckpt [65745d25]", "anythingV5_PrtRE.safetensors [893e49b9]", "AOM3A3_orangemixs.safetensors [9600da17]", "childrensStories_v13D.safetensors [9dfaabcb]", "childrensStories_v1SemiReal.safetensors [a1c56dbb]", "childrensStories_v1ToonAnime.safetensors [2ec7b88b]", "cyberrealistic_v33.safetensors [82b0d085]", "deliberate_v2.safetensors [10ec4b29]", "dreamlike-anime-1.0.safetensors [4520e090]", "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]", "dreamlike-photoreal-2.0.safetensors [fdcf65e7]", "dreamshaper_6BakedVae.safetensors [114c8abb]", "dreamshaper_7.safetensors [5cf5ae06]", "dreamshaper_8.safetensors [9d40847d]", "edgeOfRealism_eorV20.safetensors [3ed5de15]", "EimisAnimeDiffusion_V1.ckpt [4f828a15]", "elldreths-vivid-mix.safetensors [342d9d26]", "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]", "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]", "juggernaut_aftermath.safetensors [5e20c455]", "lyriel_v16.safetensors [68fceea2]", "mechamix_v10.safetensors [ee685731]", "meinamix_meinaV9.safetensors [2ec66ab0]", "meinamix_meinaV11.safetensors [b56ce717]", "openjourney_V4.ckpt [ca2f377f]", "portraitplus_V1.0.safetensors [1400e684]", "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]", "Realistic_Vision_V2.0.safetensors [79587710]", "Realistic_Vision_V4.0.safetensors [29a7afaa]", "Realistic_Vision_V5.0.safetensors [614d1063]", "redshift_diffusion-V10.safetensors [1400e684]", "revAnimated_v122.safetensors [3f4fefd9]", "rundiffusionFX25D_v10.safetensors [cd12b0ee]", "rundiffusionFX_v10.safetensors [cd4e694d]", "sdv1_4.ckpt [7460a6fa]", "v1-5-pruned-emaonly.ckpt [81761151]", "shoninsBeautiful_v10.safetensors [25d8c546]", "theallys-mix-ii-churned.safetensors [5d9225a4]", "timeless-1.0.ckpt [7c4971d4]", "toonyou_beta6.safetensors [980f6b15]"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListSamplers: {
    readonly response: {
        readonly "200": {
            readonly enum: readonly ["Euler", "Euler a", "LMS", "Heun", "DPM2", "DPM2 a", "DPM++ 2S a", "DPM++ 2M", "DPM++ SDE", "DPM fast", "DPM adaptive", "LMS Karras", "DPM2 Karras", "DPM2 a Karras", "DPM++ 2S a Karras", "DPM++ 2M Karras", "DPM++ SDE Karras", "DDIM", "PLMS"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListSdxlEmbeddings: {
    readonly response: {
        readonly "200": {
            readonly enum: readonly ["FastNegativeV2", "easynegative"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListSdxlLoras: {
    readonly response: {
        readonly "200": {
            readonly enum: readonly ["cyborg_style_xl-v10.safetensors", "LogoRedmond_v10.safetensors", "pixel-art-xl-v1.1.safetensors", "w00len_2500_v10.safetensors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListSdxlModels: {
    readonly response: {
        readonly "200": {
            readonly enum: readonly ["absolutereality_V16.safetensors [37db0fc3]", "absolutereality_v181.safetensors [3d9d4d2b]", "analog-diffusion-1.0.ckpt [9ca13f02]", "anythingv3_0-pruned.ckpt [2700c435]", "anything-v4.5-pruned.ckpt [65745d25]", "anythingV5_PrtRE.safetensors [893e49b9]", "AOM3A3_orangemixs.safetensors [9600da17]", "childrensStories_v13D.safetensors [9dfaabcb]", "childrensStories_v1SemiReal.safetensors [a1c56dbb]", "childrensStories_v1ToonAnime.safetensors [2ec7b88b]", "cyberrealistic_v33.safetensors [82b0d085]", "deliberate_v2.safetensors [10ec4b29]", "dreamlike-anime-1.0.safetensors [4520e090]", "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]", "dreamlike-photoreal-2.0.safetensors [fdcf65e7]", "dreamshaper_6BakedVae.safetensors [114c8abb]", "dreamshaper_7.safetensors [5cf5ae06]", "dreamshaper_8.safetensors [9d40847d]", "edgeOfRealism_eorV20.safetensors [3ed5de15]", "EimisAnimeDiffusion_V1.ckpt [4f828a15]", "elldreths-vivid-mix.safetensors [342d9d26]", "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]", "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]", "juggernaut_aftermath.safetensors [5e20c455]", "lyriel_v16.safetensors [68fceea2]", "mechamix_v10.safetensors [ee685731]", "meinamix_meinaV9.safetensors [2ec66ab0]", "meinamix_meinaV11.safetensors [b56ce717]", "openjourney_V4.ckpt [ca2f377f]", "portraitplus_V1.0.safetensors [1400e684]", "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]", "Realistic_Vision_V2.0.safetensors [79587710]", "Realistic_Vision_V4.0.safetensors [29a7afaa]", "Realistic_Vision_V5.0.safetensors [614d1063]", "redshift_diffusion-V10.safetensors [1400e684]", "revAnimated_v122.safetensors [3f4fefd9]", "rundiffusionFX25D_v10.safetensors [cd12b0ee]", "rundiffusionFX_v10.safetensors [cd4e694d]", "sdv1_4.ckpt [7460a6fa]", "v1-5-pruned-emaonly.ckpt [81761151]", "shoninsBeautiful_v10.safetensors [25d8c546]", "theallys-mix-ii-churned.safetensors [5d9225a4]", "timeless-1.0.ckpt [7c4971d4]", "toonyou_beta6.safetensors [980f6b15]"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListSdxlSamplers: {
    readonly response: {
        readonly "200": {
            readonly enum: readonly ["Euler", "Euler a", "LMS", "Heun", "DPM2", "DPM2 a", "DPM++ 2S a", "DPM++ 2M", "DPM++ SDE", "DPM fast", "DPM adaptive", "LMS Karras", "DPM2 Karras", "DPM2 a Karras", "DPM++ 2S a Karras", "DPM++ 2M Karras", "DPM++ SDE Karras", "DDIM", "PLMS"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Photomaker: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly imageUrls: {
                readonly type: "array";
                readonly maxItems: 10;
                readonly items: {
                    readonly type: "string";
                    readonly examples: readonly ["https://example.com/image.png"];
                };
                readonly description: "URLs of images of input character.\n";
            };
            readonly imageData: {
                readonly type: "array";
                readonly maxItems: 10;
                readonly items: {
                    readonly type: "string";
                    readonly examples: readonly ["dGhpcyBpcyBhbiBleGFtcGxl"];
                };
                readonly description: "Base-64 encoded images of input character.\n";
            };
            readonly prompt: {
                readonly type: "string";
                readonly description: "Image Prompt. Must include 'img' after character reference.\n";
                readonly examples: readonly ["man img wearing a hat"];
            };
            readonly negative_prompt: {
                readonly type: "string";
                readonly description: "Negative Image Prompt";
                readonly examples: readonly ["badly drawn"];
            };
            readonly style_preset: {
                readonly enum: readonly ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "neon-punk", "origami", "photographic", "pixel-art", "texture", "craft-clay"];
            };
            readonly strength: {
                readonly type: "number";
                readonly description: "Strength Percentage";
                readonly examples: readonly [20];
            };
            readonly steps: {
                readonly type: "number";
                readonly description: "Steps";
                readonly examples: readonly [20];
            };
            readonly seed: {
                readonly type: "number";
                readonly description: "Seed";
            };
            readonly cfg_scale: {
                readonly type: "number";
                readonly description: "CFG Scale";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SdxlGenerate: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["prompt"];
        readonly properties: {
            readonly model: {
                readonly type: "string";
                readonly description: "Model Name";
                readonly examples: readonly ["sd_xl_base_1.0.safetensors [be9edd61]"];
            };
            readonly prompt: {
                readonly type: "string";
                readonly description: "Image Prompt";
                readonly examples: readonly ["puppies in a cloud, 4k"];
            };
            readonly negative_prompt: {
                readonly type: "string";
                readonly description: "Negative Image Prompt";
                readonly examples: readonly ["badly drawn"];
            };
            readonly style_preset: {
                readonly enum: readonly ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "neon-punk", "origami", "photographic", "pixel-art", "texture", "craft-clay"];
            };
            readonly steps: {
                readonly type: "number";
                readonly description: "Steps";
                readonly examples: readonly [20];
            };
            readonly cfg_scale: {
                readonly type: "number";
                readonly description: "CFG Scale";
                readonly examples: readonly [7];
            };
            readonly seed: {
                readonly type: "number";
                readonly description: "Seed";
                readonly examples: readonly [-1];
            };
            readonly sampler: {
                readonly type: "string";
                readonly examples: readonly ["DPM++ 2M Karras"];
            };
            readonly width: {
                readonly type: "number";
                readonly minimum: 512;
                readonly maximum: 1536;
                readonly description: "Image Width";
                readonly examples: readonly [1024];
            };
            readonly height: {
                readonly type: "number";
                readonly minimum: 512;
                readonly maximum: 1536;
                readonly description: "Image Height";
                readonly examples: readonly [1024];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SdxlInpainting: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["prompt", "mask_blur", "inpainting_fill", "inpainting_full_res", "inpainting_mask_invert"];
        readonly properties: {
            readonly imageUrl: {
                readonly type: "string";
                readonly description: "Input Image URL. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["https://example.com/image.png"];
            };
            readonly imageData: {
                readonly type: "string";
                readonly description: "Base-64 Encoded Image Data. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["dGhpcyBpcyBhbiBleGFtcGxl"];
            };
            readonly maskUrl: {
                readonly type: "string";
                readonly description: "Input Mask URL. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["https://example.com/mask.png"];
            };
            readonly maskData: {
                readonly type: "string";
                readonly description: "Base-64 Encoded Mask Image Data. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["dGhpcyBpcyBhbiBleGFtcGxl"];
            };
            readonly model: {
                readonly type: "string";
                readonly description: "Model Name";
                readonly examples: readonly ["sd_xl_base_1.0.safetensors [be9edd61]"];
            };
            readonly prompt: {
                readonly type: "string";
                readonly description: "Inpainting Prompt";
                readonly examples: readonly ["puppies in a cloud, 4k"];
            };
            readonly denoising_strength: {
                readonly type: "number";
                readonly description: "Strength of image transfomation";
                readonly examples: readonly [0.7];
            };
            readonly negative_prompt: {
                readonly type: "string";
                readonly description: "Negative Inpainting Prompt";
                readonly examples: readonly ["badly drawn"];
            };
            readonly style_preset: {
                readonly enum: readonly ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "neon-punk", "origami", "photographic", "pixel-art", "texture", "craft-clay"];
            };
            readonly steps: {
                readonly type: "number";
                readonly description: "Steps";
                readonly examples: readonly [20];
            };
            readonly cfg_scale: {
                readonly type: "number";
                readonly description: "CFG Scale";
                readonly examples: readonly [7];
            };
            readonly seed: {
                readonly type: "number";
                readonly description: "Seed";
                readonly examples: readonly [-1];
            };
            readonly upscale: {
                readonly type: "boolean";
                readonly description: "Enable 2x Upscale";
                readonly examples: readonly [false];
            };
            readonly mask_blur: {
                readonly type: "number";
                readonly description: "Mask Blur Strength";
                readonly examples: readonly [4];
            };
            readonly inpainting_fill: {
                readonly type: "number";
                readonly description: "\"0 - fill, 1 - original, 2 - latent noise, 3 - latent nothing\"\n";
                readonly examples: readonly [1];
            };
            readonly inpainting_mask_invert: {
                readonly type: "number";
                readonly description: "0 - Inpaint masked, 1 - Inpaint not masked";
                readonly examples: readonly [1];
            };
            readonly inpainting_full_res: {
                readonly type: "boolean";
                readonly description: "0 - Whole picture, 1 - Only masked";
                readonly examples: readonly [false];
            };
            readonly sampler: {
                readonly type: "string";
                readonly examples: readonly ["DPM++ 2M Karras"];
            };
            readonly width: {
                readonly type: "number";
                readonly minimum: 512;
                readonly maximum: 1536;
                readonly description: "Image Width";
                readonly examples: readonly [1024];
            };
            readonly height: {
                readonly type: "number";
                readonly minimum: 512;
                readonly maximum: 1536;
                readonly description: "Image Height";
                readonly examples: readonly [1024];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SdxlTransform: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["prompt"];
        readonly properties: {
            readonly imageUrl: {
                readonly type: "string";
                readonly description: "Input Image URL. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["https://example.com/image.png"];
            };
            readonly imageData: {
                readonly type: "string";
                readonly description: "Base-64 Encoded Image Data. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["dGhpcyBpcyBhbiBleGFtcGxl"];
            };
            readonly model: {
                readonly type: "string";
                readonly description: "Model Name";
                readonly examples: readonly ["sd_xl_base_1.0.safetensors [be9edd61]"];
            };
            readonly prompt: {
                readonly type: "string";
                readonly description: "Image Prompt";
                readonly examples: readonly ["puppies in a cloud, 4k"];
            };
            readonly denoising_strength: {
                readonly type: "number";
                readonly description: "Strength of image transfomation";
                readonly examples: readonly [0.7];
            };
            readonly negative_prompt: {
                readonly type: "string";
                readonly description: "Negative Image Prompt";
                readonly examples: readonly ["badly drawn"];
            };
            readonly style_preset: {
                readonly enum: readonly ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "neon-punk", "origami", "photographic", "pixel-art", "texture", "craft-clay"];
            };
            readonly steps: {
                readonly type: "number";
                readonly description: "Steps";
                readonly examples: readonly [20];
            };
            readonly cfg_scale: {
                readonly type: "number";
                readonly description: "CFG Scale";
                readonly examples: readonly [7];
            };
            readonly seed: {
                readonly type: "number";
                readonly description: "Seed";
                readonly examples: readonly [-1];
            };
            readonly upscale: {
                readonly type: "boolean";
                readonly description: "Enable 2x Upscale";
                readonly examples: readonly [false];
            };
            readonly sampler: {
                readonly type: "string";
                readonly examples: readonly ["DPM++ 2M Karras"];
            };
            readonly width: {
                readonly type: "number";
                readonly minimum: 512;
                readonly maximum: 1536;
                readonly description: "Image Width";
                readonly examples: readonly [1024];
            };
            readonly height: {
                readonly type: "number";
                readonly minimum: 512;
                readonly maximum: 1536;
                readonly description: "Image Height";
                readonly examples: readonly [1024];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Transform: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["prompt"];
        readonly properties: {
            readonly imageUrl: {
                readonly type: "string";
                readonly description: "Input Image URL. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["https://example.com/image.png"];
            };
            readonly imageData: {
                readonly type: "string";
                readonly description: "Base-64 Encoded Image Data. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["dGhpcyBpcyBhbiBleGFtcGxl"];
            };
            readonly model: {
                readonly type: "string";
                readonly description: "Model Name";
                readonly examples: readonly ["v1-5-pruned-emaonly.safetensors [d7049739]"];
            };
            readonly prompt: {
                readonly type: "string";
                readonly description: "Image Prompt";
                readonly examples: readonly ["puppies in a cloud, 4k"];
            };
            readonly denoising_strength: {
                readonly type: "number";
                readonly description: "Strength of image transfomation";
                readonly examples: readonly [0.7];
            };
            readonly negative_prompt: {
                readonly type: "string";
                readonly description: "Negative Image Prompt";
                readonly examples: readonly ["badly drawn"];
            };
            readonly style_preset: {
                readonly enum: readonly ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "neon-punk", "origami", "photographic", "pixel-art", "texture", "craft-clay"];
            };
            readonly steps: {
                readonly type: "number";
                readonly description: "Steps";
                readonly examples: readonly [20];
            };
            readonly cfg_scale: {
                readonly type: "number";
                readonly description: "CFG Scale";
                readonly examples: readonly [7];
            };
            readonly seed: {
                readonly type: "number";
                readonly description: "Seed";
                readonly examples: readonly [-1];
            };
            readonly upscale: {
                readonly type: "boolean";
                readonly description: "Enable 2x Upscale";
                readonly examples: readonly [false];
            };
            readonly sampler: {
                readonly type: "string";
                readonly examples: readonly ["DPM++ 2M Karras"];
            };
            readonly width: {
                readonly type: "number";
                readonly minimum: 1;
                readonly maximum: 1024;
                readonly description: "Image Width";
                readonly examples: readonly [512];
            };
            readonly height: {
                readonly type: "number";
                readonly minimum: 1;
                readonly maximum: 1024;
                readonly description: "Image Height";
                readonly examples: readonly [512];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Upscale: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["resize"];
        readonly properties: {
            readonly imageUrl: {
                readonly type: "string";
                readonly description: "Input Image URL. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["https://example.com/image.png"];
            };
            readonly imageData: {
                readonly type: "string";
                readonly description: "Base-64 Encoded Image Data. Supports JPEG and PNG formats.\n";
                readonly examples: readonly ["dGhpcyBpcyBhbiBleGFtcGxl"];
            };
            readonly resize: {
                readonly enum: readonly [2, 4];
            };
            readonly model: {
                readonly enum: readonly ["ESRGAN_4x", "Lanczos", "Nearest", "LDSR", "R-ESRGAN 4x+", "R-ESRGAN 4x+ Anime6B", "ScuNET GAN", "ScuNET PSNR", "SwinIR 4x"];
                readonly default: "ESRGAN_4x";
                readonly description: "Default: ESRGAN_4x";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly job: {
                    readonly type: "string";
                    readonly description: "Job ID";
                    readonly examples: readonly ["xxxx-xxxx-xxxx-xxxx"];
                };
                readonly params: {
                    readonly type: "object";
                    readonly description: "Job Generation Params";
                    readonly examples: readonly ["{}"];
                    readonly additionalProperties: true;
                };
                readonly status: {
                    readonly enum: readonly ["queued", "generating", "failed", "succeeded"];
                };
                readonly imageUrl: {
                    readonly type: "string";
                    readonly description: "Direct URL to generated image";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { Controlnet, Facerestore, Faceswap, Generate, GetJob, Inpainting, ListEmbeddings, ListLoras, ListModels, ListSamplers, ListSdxlEmbeddings, ListSdxlLoras, ListSdxlModels, ListSdxlSamplers, Photomaker, SdxlGenerate, SdxlInpainting, SdxlTransform, Transform, Upscale };
