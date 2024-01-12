import { InputForm } from '../components/inputForm';
import { PreviewData } from '../components/dataPreview';

export default function Home() {
  return (
    <main className="flex justify-center flex-col">
      <div className="m-5">
          <h1 className="text-4xl font-bold text-center">Redis Client App</h1>
      </div>
      <div>
        <InputForm />
        <PreviewData />
      </div>
    </main>
  )
}