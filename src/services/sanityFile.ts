import {
	AbstractFileService,
	DeleteFileType,
	FileServiceGetUploadStreamResult,
	FileServiceUploadResult,
	GetUploadedFileType,
	UploadStreamDescriptorType,
} from '@medusajs/medusa'
import { SanityClient, createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { parse } from 'path'

class SanityFileService extends AbstractFileService {
	private sanityClient: SanityClient
	constructor({}, options) {
		super({}, options)

		this.sanityClient = createClient({
			projectId: options.projectId,
			dataset: options.dataset,
			token: options.token,
			apiVersion: options.apiVersion,
			useCdn: options.useCdn,
		})
	}

	async upload(file: Express.Multer.File): Promise<FileServiceUploadResult> {
		const parsedFilename = parse(file.originalname)
		const fileKey = `${parsedFilename.name}-${Date.now()}${
			parsedFilename.ext
		}`
		return this.sanityClient.assets.upload(
			'image',
			createReadStream(file.path),
			{
				filename: fileKey,
			}
		)
	}

	async delete(file: DeleteFileType): Promise<void> {
		return new Promise((resolve, reject) => {
			this.sanityClient
				.delete(file.fileKey)
				.then(() => {
					resolve()
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	async uploadProtected(fileData): Promise<FileServiceUploadResult> {
		throw new Error('Method not implemented.')
	}

	async getDownloadStream(
		fileData: GetUploadedFileType
	): Promise<NodeJS.ReadableStream> {
		throw new Error('Method not implemented.')
	}

	async getPresignedDownloadUrl(
		fileData: GetUploadedFileType
	): Promise<string> {
		throw new Error('Method not implemented.')
	}

	async getUploadStreamDescriptor(
		fileData: UploadStreamDescriptorType
	): Promise<FileServiceGetUploadStreamResult> {
		throw new Error('Method not implemented.')
	}
}

export default SanityFileService
