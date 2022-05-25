import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UploadedFile,
    ParseArrayPipe, UsePipes
} from '@nestjs/common';
import {ModuleService} from './module.service';
import {CreateModuleDto} from './dto/create-module.dto';
import {UpdateModuleDto} from './dto/update-module.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FastifyFileInterceptor} from "nest-fastify-multer";
import {diskStorage} from "multer";
import * as path from "path";
import {editFileName} from "../utils/utils";
import {FieldToArrayPipe} from "../Pipes/fieldToArrayPipe";

@Controller('module')
export class ModuleController {
    constructor(private readonly moduleService: ModuleService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @FastifyFileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: path.join(__dirname, '../..', 'static', 'modules'),
                filename: editFileName
            })
        }
    )
    create(@UploadedFile() file: Express.Multer.File,
           @Body() createModuleDto: CreateModuleDto,
           @Body('lessons',  FieldToArrayPipe) lessons) {
        if (file && file.filename) {
            createModuleDto.image_path = `/modules/${file.filename}`
        }
        return this.moduleService.create({...createModuleDto, lessons});
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.moduleService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.moduleService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @FastifyFileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: path.join(__dirname, '../..', 'static', 'courses'),
                filename: editFileName
            })
        }
    )
    update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
        return this.moduleService.update(id, updateModuleDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.moduleService.remove(id);
    }
}
