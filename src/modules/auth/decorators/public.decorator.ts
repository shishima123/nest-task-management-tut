import { SetMetadata } from '@nestjs/common';

// usage: @Public()
// Using in controllers or methods with @UseGuards(JwtAuthGuard) decorator to make it public(no auth needed)

export const Public = () => SetMetadata('isPublic', true);
