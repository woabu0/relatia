// Mock authentication service
export const auth = {
    getCurrentUser: () => {
      // In real app, this would come from your auth context/state
      return {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin' // This would be dynamic based on route
      };
    }
  };