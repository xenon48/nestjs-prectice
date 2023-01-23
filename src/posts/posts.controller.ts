import { CreatePostDto } from './dto/create-post.dto';
import { UseInterceptors, Get, Body, Controller, Post, UseGuards, UsePipes, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) { }

    @Post()
    @UseInterceptors(FileIntenceptor('image'))
    createPost(@Body() dto: CreatePostDto,
        @UploadedFile() image) {
        return this.postService.create(dto, image)
    }
}
