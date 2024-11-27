import ApiService from './databaseinit';

class CourseService extends ApiService {


    constructor(baseUrl: string) {
        super(baseUrl); 
    }

    public async createCourse(courseData: any) {
        try {
            const response = await this.post('/courses', courseData);
            return response;
        } catch (error) {
            console.error('Error creating course:', error);
            throw new Error('Failed to create course');
        }
    }

    // Récupérer tous les cours
    public async getCourses() {
        try {
            const response = await this.get('/courses');
            return response;
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw new Error('Failed to fetch courses');
        }
    }

    // Récupérer un cours par son ID
    public async getCourseById(courseId: string) {
        try {
            const response = await this.get(`/courses/${courseId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching course with ID ${courseId}:`, error);
            throw new Error(`Failed to fetch course with ID ${courseId}`);
        }
    }

    // Récupérer les cours filtrés par date (ex: today, nextTwoDays, previous)
    public async getCoursesByDate(dateOption: 'today' | 'nextTwoDays' | 'previous') {
        try {
            const response = await this.get(`/getcoursesbydate?dateOption=${dateOption}`);
            return response;
        } catch (error) {
            console.error('Error fetching courses by date:', error);
            throw new Error('Failed to fetch courses by date');
        }
    }

    // Récupérer les cours triés par popularité (moyenne des notes)
    public async getCoursesByPopularity() {
        try {
            const response = await this.get('/getcoursesbypopularity');
            return response;
        } catch (error) {
            console.error('Error fetching courses by popularity:', error);
            throw new Error('Failed to fetch courses by popularity');
        }
    }

    // Mettre à jour un cours
    public async updateCourse(courseId: string, courseData: any) {
        try {
            const response = await this.put(`/courses/${courseId}`, courseData);
            return response;
        } catch (error) {
            console.error(`Error updating course with ID ${courseId}:`, error);
            throw new Error(`Failed to update course with ID ${courseId}`);
        }
    }

    // Supprimer un cours
    public async deleteCourse(courseId: string) {
        try {
            const response = await this.delete(`/courses/${courseId}`);
            return response;
        } catch (error) {
            console.error(`Error deleting course with ID ${courseId}:`, error);
            throw new Error(`Failed to delete course with ID ${courseId}`);
        }
    }
}

export default CourseService;
