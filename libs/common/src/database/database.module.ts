import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurableModuleClass } from '@nestjs/common/cache/cache.module-definition';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
            uri: configService.get('MONGODB_URI')
        }),
        inject: [ConfigService],
    })],
})
export class DatabaseModule extends ConfigurableModuleClass {
    static forFeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models);
    }
}