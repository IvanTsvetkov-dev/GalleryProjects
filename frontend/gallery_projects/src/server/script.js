const BASE_URL = 'http://localhost:8000/api/v1/'

/**
 * Получить список всех проектов.
 * @param {number} pageNumber - Номер страницы(пагинация)
 * @throws {Error} При ошибках HTTP (404, 500 и т.д.).
 * @returns {Promise<Object[]>} Массив объектов проектов.
 */
export async function fetchListProjects(pageNumber=1) {
	const response = await fetch(`${BASE_URL}projects/?page=${pageNumber}`)

	if (response.status !== 200) {
		if (response.status === 404) {
			throw new Error('Проекты не найдены (404)');
		} else if (response.status === 500) {
			throw new Error('Внутренняя ошибка сервера (500)');
        } else if(response.status === 403){
            throw new Error('Ошибка авторизации!');
        }
		else {
			throw new Error(`Ошибка сервера: ${response.status}`);
		}
    }
	const data = await response.json();
	return data;
}

/**
 * Создать новый проект.
 * @param {FormData} formDataProject - Данные проекта для создания.
 * @throws {Error} При ошибках HTTP (404, 500 и т.д.).
 * @returns {Promise<void>} 
 */
export async function createProject(formDataProject){
    const response = await fetch(`${BASE_URL}projects/`, {
            method: 'POST',
            body: formDataProject
    })
    if (response.status !== 201) {
        if (response.status === 404) {
			throw new Error('Проекты не найдены (404)')
		} else if (response.status === 500) {
			throw new Error('Внутренняя ошибка сервера (500)')
		} else {
			throw new Error(`Ошибка сервера: ${response.status}`)
		}
	}
}

/**
 * Обновить существующий проект по ID.
 * @param {string} id - Идентификатор проекта для обновления.
 * @param {FormData} formData - Новые данные проекта.
 * @throws {Error} При ошибках HTTP (404, 500 и т.д.).
 * @returns {Promise<void>}
 */
export async function updateProject(id, formData) {
	const response = await fetch(`http://localhost:8000/api/v1/projects/${id}/`, {
		method: 'PUT',
		body: formData,
	})
    if (response.status !== 200) {
		if (response.status === 404) {
			throw new Error('Проекты не найдены (404)')
		} else if (response.status === 500) {
			throw new Error('Внутренняя ошибка сервера (500)')
		} else {
			throw new Error(`Ошибка сервера: ${response.status}`)
		}
	}
}

/**
 * Удалить список проектов по их ID.
 * @param {Array<string>} listProjectsId - Массив идентификаторов проектов для удаления.
 * @returns {Promise<void>}
 */
export async function deleteSelectedProjects(listProjectsId){
    for(let projectId of listProjectsId){
        await fetch(`${BASE_URL}projects/${projectId}/`,{
            method: 'DELETE'
        });
    }
}

/**
 * Получить данные конкретного проекта по ID.
 * @param {string} id - Идентификатор проекта.
 * @throws {Error} При ошибках HTTP (не 200).
 * @returns {Promise<Object>} Объект проекта.
 */
export async function fetchProject(id){
	const response = await fetch(`${BASE_URL}projects/${id}`)
	const data = response.json()
	if (response.status !== 200) {
		if (response.status === 404) {
			throw new Error('Проект не найден (404)')
		} else if (response.status === 500) {
			throw new Error('Внутренняя ошибка сервера (500)')
		} else {
			throw new Error(`Ошибка сервера: ${response.status}`)
		}
	}
	return data
}