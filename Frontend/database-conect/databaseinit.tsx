class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request(method: string, endpoint: string, data?: any) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data ? JSON.stringify(data) : undefined,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    }

    public get(endpoint: string) {
        return this.request('GET', endpoint);
    }

    public post(endpoint: string, data: any) {
        return this.request('POST', endpoint, data);
    }

    public put(endpoint: string, data: any) {
        return this.request('PUT', endpoint, data);
    }

    public delete(endpoint: string) {
        return this.request('DELETE', endpoint);
    }
}

export default ApiService;