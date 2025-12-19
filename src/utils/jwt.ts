export const jwtUtil = {
  getTokenIdFromToken: (token: string): string | null => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const payload = JSON.parse(atob(parts[1]));
      return payload.jti || payload.id || payload.tokenId || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },
};

